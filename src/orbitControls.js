import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
mesh.position.set(1,0,-1)

const sizes= {
    width: window.innerWidth, 
    height: window.innerHeight
}

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Camera
const aspectRatio = sizes.width/sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
camera.position.set(0,0,3)
// const camera = new THREE.OhjurthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 800)
// camera.lookAt(group.position)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 1
controls.target.z = -2
controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE
controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE

controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}
controls.enableDamping = true
controls.listenToKeyEvents(window)
controls.keyPanSpeed = 10
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


//Animate
// const clock = new THREE.Clock()
const tick = () => {
    // group.rotation.x = clock.getElapsedTime()

    //update camera

    camera.lookAt(mesh.position)

    //Update controls
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()