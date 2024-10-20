import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
//Canvas 
const canvas = document.querySelector('canvas.webgl')

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

window.addEventListener("resize", () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Scene
const scene = new THREE.Scene()

//Texture 
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            "Kim Pham",
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegment: 10,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const textMaterial = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        textGeometry.center()
        scene.add(text)
    }
)

//Objects

for(let i=0; i < 40; i++)
{
    const coneGeometry = new THREE.ConeGeometry(0.3,0.8,25)
    const coneMaterial = new THREE.MeshNormalMaterial()
    const cone = new THREE.Mesh(coneGeometry, coneMaterial)
    cone.position.x = (Math.random() - 0.5) * 10
    cone.position.y = (Math.random() - 0.5) * 10
    cone.position.z = (Math.random() - 0.5) * 10
    cone.rotation.x = Math.random() * 2*Math.PI
    cone.rotation.y = Math.random() * 2*Math.PI
    scene.add(cone)
}

for(let i=0; i < 40; i++)
{
    const coneGeometry = new THREE.TorusGeometry(0.2,0.1,25)
    const coneMaterial = new THREE.MeshNormalMaterial()
    const cone = new THREE.Mesh(coneGeometry, coneMaterial)
    cone.position.x = ((Math.random() - 0.5) * 10) + 2
    cone.position.y = ((Math.random() - 0.5) * 10) + 2
    cone.position.z = (Math.random() - 0.5) * 10 
    cone.rotation.x = Math.random() * 2*Math.PI
    cone.rotation.y = Math.random() * 2*Math.PI
    scene.add(cone)
}

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width/ sizes.height)
camera.position.z =2
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
controls.update();
renderer.render(scene, camera)
window.requestAnimationFrame(tick)
}
tick()