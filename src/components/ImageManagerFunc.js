import ImagePreview from "./ImagePreviewFunc";
import { useState } from "react";

export default function ImageManager() {
    const [dataUrl, setDataUrl] = useState([])

    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
        
            fileReader.addEventListener('load', evt => {
                resolve(evt.currentTarget.result);
            });
          
            fileReader.addEventListener('error', evt => {
                reject(new Error(evt.currentTarget.error));
            });
          
            fileReader.readAsDataURL(file);
        });
    }
      
    const handleSelect = async (evt) => {
        const files = [...evt.target.files];
        evt.target.files = null;
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));

        urls.forEach(url => {
            setDataUrl((prevDataUrl) => [...prevDataUrl, {id: url, url}])
        });
    };

    const handleCliceClose = (id) => {
        const filterUrl = dataUrl.filter(url => url.id !== id);
        setDataUrl(filterUrl);
    };

    return (
        <div className="app_container">
            <div className="dnd_container">
                <input className="input_file" type="file" multiple onChange={handleSelect}></input>
                <span className="imposed_on_input">Click to select</span>
            </div>
            <div className="preview_container">
                {dataUrl.map(url => {
                    return <ImagePreview key={url.id} url={url} handleCliceClose={handleCliceClose}/>
                })}
            </div>
        </div>
    )
}