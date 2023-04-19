import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  FormControl,
  InputLabel,
  Autocomplete,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  Fade
} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Dropzone from 'react-dropzone'
import UserImage from 'components/UserImage'
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import { categoryData } from 'utils/content/categoryData'
import { countries } from 'utils/content/countriesData'

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const [image, setImage] = useState('')
  const [post, setPost] = useState('')
  const { palette } = useTheme()
  const { _id } = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const [category, setCategory] = useState('')
  const [country, setCountry] = useState({ label: '', code: '' });
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium

  const handlePost = async ev => {
    ev.preventDefault()
    if (!category || !country.label) {
      setSubmitted(true)
    } else {
      const formData = new FormData()
      formData.append('userId', _id)
      formData.append('description', post)
      formData.append('category', category)
      formData.append('country', country.label)

      if (image) {
        const base64 = await convertTobase64(image)
        // formData.append("picture", image);
        // formData.append("picturePath", image.name);
        formData.append('picturePath', base64)
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/posts`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        }
      )
      const posts = await response.json()
      dispatch(setPosts({ posts }))
    }
    setImage(null)
    setPost("");
    setSubmitted(false);
    setShowCategory(false);
    setCategory('');
    setCountry({ label: '', code: '' });
    setIsImage(false);
  }

  const convertTobase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = error => {
        reject(error)
      }
    })
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        {!showCategory && <UserImage image={picturePath} />}
        {/* show/hide category field based on showCategory state */}
        <Box width='100%'>
          {showCategory && (
            <Fade in={showCategory} mountOnEnter unmountOnExit>
              <FormControl
                size='small'
                sx={{ width: '50%', mb: 1 }}
                error={submitted && !category}
              >
                <InputLabel id='category-label'>Select a Topic</InputLabel>
                <Select
                  value={category}
                  label='Select a category'
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  <MenuItem value=''>Select a topic</MenuItem>{' '}
                  {/* add an empty option */}
                  {categoryData.map(category => (
                    <MenuItem key={category.title} value={category.title}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Fade>
          )}
          {showCategory && (
            <Fade in={showCategory} mountOnEnter unmountOnExit>
              <FormControl
                size='small'
                sx={{ width: '50%', mb: 1 }}
                error={submitted && !country.label}
              >
                <Autocomplete
                  options={countries}
                  value={country}
onChange={(event, option) => setCountry(option)}
                  size='small'
                  autoHighlight
                  getOptionLabel={option => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component='li'
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading='lazy'
                        width='20'
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=''
                      />
                      {option.label} ({option.code}) 
                    </Box>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Choose a country'
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />

              </FormControl>
            </Fade>
          )}

          {isImage && (
            <Box
              border={`1px solid ${medium}`}
              d
              borderRadius='5px'
              m='1rem 0'
              p='1rem'
            >
              <Dropzone
                acceptedFiles='.jpg,.jpeg,.png'
                multiple={false}
                onDrop={acceptedFiles => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p='1rem'
                      width='100%'
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: '15%' }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}

          <InputBase
            placeholder="What's on your mind..."
            onChange={e => setPost(e.target.value)}
            onClick={() => setShowCategory(true)}
            value={post}
            sx={{
              width: '100%',
              backgroundColor: palette.neutral.light,
              borderRadius: '2rem',
              padding: '1rem 2rem'
            }}
          />
        </Box>
      </FlexBetween>

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap='0.25rem'>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap='0.25rem'>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap='0.25rem'>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap='0.25rem'>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
            '&:hover': {
              cursor: 'pointer',
              color: palette.background.alt,
              backgroundColor: palette.primary.main
            }
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
