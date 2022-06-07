import { func } from 'prop-types';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {act, fireEvent, render} from '@testing-library/react'
import { receiveMessageOnPort } from 'worker_threads';

// what should this address be??
const client = new W3CWebSocket('ws://localhost:8080');

// SEND TO SERVER
// drag and drop files 
// TODO: add type of file restriction?
function Dropzone({ open }) {
    const { getRootProps, getInputProps, acceptedFiles } =
      useDropzone({});
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    return (
      <div className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
        </div>
        <aside>
          <ul>{files}</ul>
        </aside>
      </div>
    );
  }
  
export default Dropzone;

<Basic />

// when file is uploaded
useDropzone.addEventListener("drop", function(e) {
    // prevent browser default behavior on drop
    e.preventDefault();

    // make a new fileReader object with dropped file
    var fileReader = new FileReader();
    
    // break up what we send to the server 
    // TODO: how big should it be? rn its 100 kb
    const slice = fileReader.slice(0, 100000);    

    fileReader.onload = () => {
        const int8Array = new Int8Array(fileReader.result);
        //aray buffer to send
        const data = [];
        each (int8Array, (item) => {
            data.push(item);
        });
    };
    
    fileReader.readAsArrayBuffer(slice);

    // when file is loaded...
    fileReader.addEventListener("loadend", function() {
        client.send(slice.result);
    });

});

// RECEIVE FROM SERVER
// giving enhanced audio file back to client

function componentDidMount() {
    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };
    // messages from server
    // TODO: what exactly is the client recieving from the server?

    client.onmessage = (message) => {
        client.log(message);
    };
}



//close the connection
client.close();