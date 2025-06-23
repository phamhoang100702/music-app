import soundtifyLogo from '@/assets/new-logo-v3.png'
import unknownArtistImage from '@/assets/unknown_artist.png'
import unknownTrackImage from '@/assets/unknown_track.png'
import { Image } from 'react-native'

export const unknownTrackImageUri = Image.resolveAssetSource(unknownTrackImage).uri
export const unknownArtistImageUri = Image.resolveAssetSource(unknownArtistImage).uri
export const soundtifyLogoUri = Image.resolveAssetSource(soundtifyLogo).uri
