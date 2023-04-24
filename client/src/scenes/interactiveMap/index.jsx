// this is the interactive map

import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Fab } from '@mui/material'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import Navigation from 'layout/navigation'
import {
  DoubleSide,
  PCFSoftShadowMap,
  MeshPhysicalMaterial,
  TextureLoader,
  FloatType,
  PMREMGenerator,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  ACESFilmicToneMapping,
  sRGBEncoding,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  Vector2,
  DirectionalLight,
  Clock,
  RingGeometry,
  Vector3,
  PlaneGeometry,
  CameraHelper,
  Group,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  Euler,
  Quaternion
} from 'https://cdn.skypack.dev/three@0.137'
import { RGBELoader } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/RGBELoader'
import { OrbitControls } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls'
import { GLTFLoader } from 'https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/GLTFLoader'
import anime from 'https://cdn.skypack.dev/animejs@3.2.1'


const InteractiveMap = () => {
  const containerRef = useRef(null)
  const renderer = new WebGLRenderer({ antialias: true, alpha: true })
  const canvasRef = useRef(null)
  const [coordinates, setCoordinates] = useState({})

  

  useEffect(() => {
    const scene = new Scene()

    let sunBackground = document.querySelector('.sun-background')
    let moonBackground = document.querySelector('.moon-background')

    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 15, 28)

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.outputEncoding = sRGBEncoding
    renderer.physicallyCorrectLights = true
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    const canvas = canvasRef.current
    canvas.appendChild(renderer.domElement)

    const sunLight = new DirectionalLight(
      new Color('#FFFFFF').convertSRGBToLinear(),
      3.5
    )
    sunLight.position.set(10, 20, 10)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 512
    sunLight.shadow.mapSize.height = 512
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 100
    sunLight.shadow.camera.left = -10
    sunLight.shadow.camera.bottom = -10
    sunLight.shadow.camera.top = 10
    sunLight.shadow.camera.right = 10
    scene.add(sunLight)

    const moonLight = new DirectionalLight(
      new Color('#77ccff').convertSRGBToLinear(),
      0
    )
    moonLight.position.set(-10, 20, 10)
    moonLight.castShadow = true
    moonLight.shadow.mapSize.width = 512
    moonLight.shadow.mapSize.height = 512
    moonLight.shadow.camera.near = 0.5
    moonLight.shadow.camera.far = 100
    moonLight.shadow.camera.left = -10
    moonLight.shadow.camera.bottom = -10
    moonLight.shadow.camera.top = 10
    moonLight.shadow.camera.right = 10
    scene.add(moonLight)

    // // Create a helper for the shadow camera (optional)
    // const helper = new CameraHelper( moonLight.shadow.camera );
    // scene.add(helper);

    // const helper2 = new CameraHelper( sunLight.shadow.camera );
    // scene.add( helper2 );

    

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0, 0)
    controls.dampingFactor = 0.05
    controls.enableDamping = true
    controls.enableZoom = false

    let mousePos = new Vector2(0, 0);
    (async function () {
        let pmrem = new PMREMGenerator(renderer)
        let envmapTexture = await new RGBELoader()
          .setDataType(FloatType)
          .loadAsync('three/old_room_2k.hdr') // thanks to https://polyhaven.com/hdris !
        let envMap = pmrem.fromEquirectangular(envmapTexture).texture

        let textures = {
          // thanks to https://free3d.com/user/ali_alkendi !
          bump: await new TextureLoader().loadAsync('three/earthbump.jpg'),
          map: await new TextureLoader().loadAsync('three/earthmap.jpg'),
          spec: await new TextureLoader().loadAsync('three/earthspec.jpg'),
          planeTrailMask: await new TextureLoader().loadAsync('three/mask.png')
        }

        textures.map.encoding = sRGBEncoding

        let sphere = new Mesh(
          new SphereGeometry(10, 70, 70),
          new MeshPhysicalMaterial({
            map: textures.map,
            roughnessMap: textures.spec,
            bumpMap: textures.bump,
            bumpScale: 0.4,
            envMap,
            envMapIntensity: 0.1,
            sheen: 0.3,
            sheenRoughness: 0.5,
            sheenColor: new Color('#77ccff').convertSRGBToLinear(),
            clearcoat: 0
          })
        )
        sphere.sunEnvIntensity = 0.2
        sphere.moonEnvIntensity = 0.1
        sphere.rotation.y += Math.PI * 1.25
        sphere.receiveShadow = true
        scene.add(sphere)

        // https://sketchfab.com/3d-models/cartoon-plane-f312ec9f87794bdd83630a3bc694d8ea#download
        // "Cartoon Plane" (https://skfb.ly/UOLT) by antonmoek is licensed under Creative Commons Attribution
        // (http://creativecommons.org/licenses/by/4.0/).
        let plane = (await new GLTFLoader().loadAsync('three/plane/scene.glb'))
          .scene.children[0]
        let planesData = [
          makePlane(plane, textures.planeTrailMask, envMap, scene),
          makePlane(plane, textures.planeTrailMask, envMap, scene),
          makePlane(plane, textures.planeTrailMask, envMap, scene),
          makePlane(plane, textures.planeTrailMask, envMap, scene),
          makePlane(plane, textures.planeTrailMask, envMap, scene)
        ]

        let daytime = true
        let animating = false
        window.addEventListener('mousemove', e => {
          if (animating) return

          let anim = [0, 1]

          if (e.clientX > window.innerWidth - 300 && !daytime) {
            anim = [1, 0]
          } else if (e.clientX < 300 && daytime) {
            anim = [0, 1]
          } else {
            return
          }

          animating = true

          let obj = { t: 0 }
          anime({
            targets: obj,
            t: anim,
            complete: () => {
              animating = false
              daytime = !daytime
            },
            update: () => {
              sunLight.intensity = 3.5 * (1 - obj.t)
              moonLight.intensity = 3.5 * obj.t

              sunLight.position.setY(20 * (1 - obj.t))
              moonLight.position.setY(20 * obj.t)

              sphere.material.sheen = 1 - obj.t
              scene.children.forEach(child => {
                child.traverse(object => {
                  if (object instanceof Mesh && object.material.envMap) {
                    object.material.envMapIntensity =
                      object.sunEnvIntensity * (1 - obj.t) +
                      object.moonEnvIntensity * obj.t
                  }
                })
              })

              sunBackground.style.opacity = 1 - obj.t
              moonBackground.style.opacity = obj.t
            },
            easing: 'easeInOutSine',
            duration: 100
          })
        })

        let clock = new Clock()

        renderer.setAnimationLoop(() => {
          let delta = clock.getDelta()
          sphere.rotation.y += delta * 0.09

          controls.update()
          renderer.render(scene, camera)
          planesData.forEach(planeData => {
            let plane = planeData.group

            plane.position.set(0, 0, 0)
            plane.rotation.set(0, 0, 0)
            plane.updateMatrixWorld()
            planeData.rot += delta * 0.25
            plane.rotateOnAxis(planeData.randomAxis, planeData.randomAxisRot) // random axis
            plane.rotateOnAxis(new Vector3(0, 1, 0), planeData.rot) // y-axis rotation
            plane.rotateOnAxis(new Vector3(0, 0, 1), planeData.rad) // this decides the radius
            plane.translateY(planeData.yOff)
            plane.rotateOnAxis(new Vector3(1, 0, 0), +Math.PI * 0.5)
          })

          renderer.autoClear = false

          renderer.autoClear = true
        })
      })()

    function nr() {
      return Math.random() * 2 - 1
    }

    function makePlane(planeMesh, trailTexture, envMap, scene) {
      let plane = planeMesh.clone()
      plane.scale.set(0.001, 0.001, 0.001)
      plane.position.set(0, 0, 0)
      plane.rotation.set(0, 0, 0)
      plane.updateMatrixWorld()

      plane.traverse(object => {
        if (object instanceof Mesh) {
          object.material.envMap = envMap
          object.sunEnvIntensity = 1
          object.moonEnvIntensity = 0.3
          object.castShadow = true
          object.receiveShadow = true
        }
      })

      let trail = new Mesh(
        new PlaneGeometry(1, 2),
        new MeshPhysicalMaterial({
          envMap,
          envMapIntensity: 3,

          roughness: 0.4,
          metalness: 0,
          transmission: 1,

          transparent: true,
          opacity: 1,
          alphaMap: trailTexture
        })
      )
      trail.sunEnvIntensity = 3
      trail.moonEnvIntensity = 0.7
      trail.rotateX(Math.PI)
      trail.translateY(1.1)

      let group = new Group()
      group.add(plane)
      group.add(trail)

      scene.add(group)

      return {
        group,
        yOff: 10.5 + Math.random() * 1.0,
        rot: Math.PI * 2, // just to set a random starting point
        rad: Math.random() * Math.PI * 0.45 + Math.PI * 0.05,
        randomAxis: new Vector3(nr(), nr(), nr()).normalize(),
        randomAxisRot: Math.random() * Math.PI * 2
      }
    }

   



    window.addEventListener('mousemove', e => {
      let x = e.clientX - window.innerWidth * 0.5
      let y = e.clientY - window.innerHeight * 0.5

      mousePos.x = x * 0.0003
      mousePos.y = y * 0.0003
    })

    return () => {
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }
  }, [containerRef])

  const [all, setAll] = useState(true);
  const [ongoing, setOngoing] = useState(false);
  const [alerts, setAlerts] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All');

  const handleAllClick = () => {
    setAll(true);
    setOngoing(false);
    setAlerts(false);
    setSelectedOption('All');
  };

  const handleOngoingClick = () => {
    setAll(false);
    setOngoing(true);
    setAlerts(false);
    setSelectedOption('Ongoing');
  };

  const handleAlertsClick = () => {
    setAll(false);
    setOngoing(false);
    setAlerts(true);
    setSelectedOption('Alerts');
  };



  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  var crisisCountries = []

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
            `https://api.reliefweb.int/v1/reports?appname=apidoc`

        )
        var crisisCountries = ''
        setData(response.data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <Fragment>
      <Navigation />

      <div className='options__wrapper'>
        <div className='options'>
          <div className='options__panel'>
            <button
              className={`options__panel__all ${all ? 'selected' : ''}`}
              onClick={handleAllClick}
            >
              All
            </button>
            <button
              className={`options__panel__ongoing ${ongoing ? 'selected' : ''}`}
              onClick={handleOngoingClick}
            >
              Ongoing
            </button>
            <button
              className={`options__panel__alerts ${alerts ? 'selected' : ''}`}
              onClick={handleAlertsClick}
            >
              Alerts
            </button>

          </div>

          <div className='options__info'>
            <h2 className='options__info__title'>The Latest News</h2>
            <Box></Box>
            {loading && <div>A moment please...</div>}
            {error && (
              <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <ul>
              {data &&
                data.data.map(({ id, fields}) => (
                  <li key={id}>
                    <h3>{fields.title}</h3>
                    <a href={'https://reliefweb.int/'}>Link to article</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className='options__toggle'>
          <Fab size='small' aria-label='close'>
            <ArrowBackIosNewRoundedIcon />
          </Fab>
        </div>
      </div>

      <div>
        <div className='sun-background'></div>
        <div className='moon-background'></div>
      </div>

      <div id='canvas-container' className='map-canvas' ref={canvasRef}>


      </div>
    </Fragment>
  )
}

export default InteractiveMap
