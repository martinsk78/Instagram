import PropTypes from 'prop-types'

export default function Image({src, caption}){
    return (<img className='' src={src} alt={caption}/>)
}