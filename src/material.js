import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import GUI from 'lil-gui'

const gui = new GUI()
//Canvas
const canvas = document.querySelector('canvas.webgl')
const guiObj = {
    normalScale: 0.5
}
//Scene
const scene = new THREE.Scene()

//Loading Manager
const loadingManager = new THREE.LoadingManager(() => console.log("loading"), 
() => console.log("Progressing..."),
() => console.log("Done"))
//Object
const textureLoader =  new THREE.TextureLoader(loadingManager)
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (env) => {
     env.mapping = THREE.EquirectangularReflectionMapping

    scene.background = env
    scene.environment = env
})
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/3.png')
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

//MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({map: doorColorTexture})
// material.map = doorColorTexture
// material.color = new THREE.Color('#ff0000')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// material.flatShading = true

//MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

//MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

//MeshMoonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture
// gradientTexture.generateMipmaps = false

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.side= THREE.DoubleSide
// material.map = doorColorTexture

// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.metalness = 1
// material.roughness = 1
// material.normalMap = doorNormalTexture
// material.normalScale.set(guiObj.normalScale, guiObj.normalScale)
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.transparent = true
// material.alphaMap = doorAlphaTexture


//MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.color = "#0000ff"
material.side= THREE.DoubleSide
// material.map = doorColorTexture
material.metalness = 1
material.roughness = 1
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1

// material.normalMap = doorNormalTexture
// material.normalScale.set(guiObj.normalScale, guiObj.normalScale)
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.displacementMap = doorHeightTexture
material.displacementScale = 0.1
material.transparent = true
// material.alphaMap = doorAlphaTexture
// Clearcoat
material.clearcoat = 1
material.clearcoatRoughness = 0

gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

Sheen
material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)

gui.add(material, 'sheen').min(0).max(1).step(0.0001)
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
gui.addColor(material, 'sheenColor')

// Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [ 100, 800 ]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)

//Others
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
gui.add(material, 'displacementScale').min(0.1).max(1).step(0.001)
gui.add(guiObj, 'normalScale').min(0.1).max(1).step(0.001).onFinishChange(() => material.normalScale.set(guiObj.normalScale, guiObj.normalScale))


// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 66, 66),
    material 
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1,100,100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 66, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)
//Sizes
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100 )
camera.position.set(1,1,2)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()