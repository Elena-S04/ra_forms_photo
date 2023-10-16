export default function ImagePreview(props) {
  const { url, handleCliceClose } = props;

  return (
      <div className="container_image">
          <img className="preview_image" src={url.url} alt="preview"></img>
          <span className="close" onClick={() => handleCliceClose(url.id)}>
              &#10006;
          </span>
      </div>
  )
}