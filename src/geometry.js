import * as THREE from "three"

//Canvas
const canvas = document.querySelector('canvas.webgl')

const cursor = {
    x : 0,
    y: 0,
}

canvas.addEventListener('mousemove', (event) => {
cursor.x= event.clientX / sizes.width - 0.5
cursor.y= event.clientY / sizes.height - 0.5
})

//Scene
const scene = new THREE.Scene()

//Size
const sizes= {
    width: window.innerWidth, 
    height: window.innerHeight
}

//Mesh
// const geometry = new THREE.SphereGeometry(1, 12, 12)
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()
const count = 50
// const positionsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ])

const positionsArray = new Float32Array(count * 3 *3)
for(let i = 0; i < count *3 *3; i++){
    positionsArray[i] = (Math.random() - 0.5) *4
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
const material = new THREE.MeshBasicMaterial({color: 0xf0f0f0, wireframe: true})
const mesh = new THREE.Mesh(geometry,material``)
mesh.rotation.y = 1
mesh.position.set(1,0,0)

scene.add(mesh)

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    // group.rotation.x = clock.getElapsedTime()

    //update camera
    mesh.rotation.y = cursor.x * Math.PI * 2

    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
