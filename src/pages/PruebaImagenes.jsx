import React, {Fragment, useState} from 'react';


export default function PruebaImagenes() {
    const [file, setFile] = useState(null)

  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  const sendHandler = () => {
    if(!file){
      alert('you must upload file')
      return
    }

    const formdata = new FormData()
    formdata.append('image', file)

    fetch('http://localhost:9000/images/post', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => console.log(res))
    console.log("formdata: ", formdata  )
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)
  }


    return (

        <>
        <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
            <input type="file" onChange={selectedHandler} />
          <button onClick={sendHandler}>Upload</button>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}