# STL Viewer

A component for viewing an STL object from a given URL. Currently you will need to enter the x,y and z dimensions of the object as well. In the future, this will not be needed

# Installation

	npm install stl-viewer

# Usage
	import STLViewer from 'stl-viewer'
	
	<STLViewer url='http://www.example.com/example-url.stl' xDims={10} yDims={10} zDims={10} width={150} height={150} modelColor={0x005B83} backgroundColor={0xEAEAEA} />
