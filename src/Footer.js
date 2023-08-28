import "./Styles/footer.css";
import {useEffect, useState} from 'react';

async function getApiVersion(){
  const apiVersion = await fetch('http://localhost:3001/api/version')
                      .then(res => res.json())
                      .then(data => {return data});
  
  var footerText = document.getElementById('api')
    .innerText = `API Version: ${apiVersion['version']}`;
}

function Footer() {
  useEffect(() =>{
    getApiVersion();
  });

  return ( 
    <div id="footer">  
      <p id="api">
      </p> 
    </div>
  )
} 
 
export default Footer; 