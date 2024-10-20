import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { color } from 'three/webgpu';

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)


//Object
const geometry = new THREE.BoxGeometry(1,1,1)
const colorTexture = textureLoader.load('/textures/minecraft.png')
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

colorTexture.colorSpace = THREE.SRGBColorSpace
// colorTexture.repeat.x = 2
// colorTexture.repeat.y= 1
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.offset.y = 0.1
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

const material = new THREE.MeshBasicMaterial({map: colorTexture})

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width /sizes.height, 0.1, 100)
camera.position.set(1,1,0)
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = () =>
{
    //Update controls
    controls.update()
  
    renderer.render(scene, camera)

    //Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()