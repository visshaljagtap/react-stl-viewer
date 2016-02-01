# React STL Viewer

A React component for viewing an STL object from a given URL by utilizing Three.js

*Note that you will still have to abide by the rules of CORS so you won't just be able to load a 3D file from someone else's site*

# Installation

	npm install stl-viewer

# Usage
	import STLViewer from 'stl-viewer'
	
	<STLViewer
   		url='http://www.example.com/example-url.stl'
    	width={400}
   		height={400}
    	modelColor='#B92C2C'
    	backgroundColor='#EAEAEA'
    	rotate={true}
    	orbitControls={true}
  	/>
