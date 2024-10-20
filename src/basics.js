import * as THREE from "three"
import gsap from "gsap"
import GUI from 'lil-gui'

//Debug
const gui = new GUI({
    width: 200,
    title: "Nice debug UI",
    closeFolders: true
})
// gui.close()
// gui.hide();
const debugObject = {}
debugObject.color = "#a778d8"
debugObject.spin = () => {
    gsap.to(group.rotation, {duration: 1, y: group.rotation.y + Math.PI *2})
}
debugObject.subdivision = 1

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Cursor
const cursor = {
    x : 0,
    y: 0,
}

canvas.addEventListener('mousemove', (event) => {
cursor.x= event.clientX / sizes.width - 0.5
cursor.y= event.clientY / sizes.height - 0.5
})

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
//Scene
const scene = new THREE.Scene()

//Object
const group = new THREE.Group()
group.position.y =1
scene.add(group)

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: debugObject.color})
const cube1 = new THREE.Mesh(geometry, material)
cube1.position.set(1,0,-1)
// mesh.scale.set(1,2,1)
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)
group.add(cube1)

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true}))
cube2.position.x=-1
group.add(cube2)

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
new THREE.MeshBasicMaterial({color: 0xff0000}))
cube3.position.y=-1.5
group.add(cube3)

//GUI settings
const cube1Tweaks = gui.addFolder('Cube 1')
// cube1Tweaks.close()
const cube2Tweaks = gui.addFolder('Cube 2')
// cube2Tweaks.close()
const cube3Tweaks = gui.addFolder('Cube 3')
// cube3Tweaks.close()

gui.add(group.position, 'y').min(-1).max(5).step(0.01).name('elevation')
gui.add(debugObject, "spin")

// gui.add ({myVariable: 1331}, 'myVariable')
cube3Tweaks.add(cube3, 'visible').name('Visible')
cube1Tweaks.add(material, 'wireframe')
cube1Tweaks.addColor(debugObject, 'color')
    .onChange(() => {
        material.color.set(debugObject.color)
    })
cube2Tweaks.add(debugObject, 'subdivision')
    .min(1)
    .max(10)
    .step(1)
    .onFinishChange(() => {
        cube2.geometry.dispose()
        cube2.geometry = new THREE.BoxGeometry(
            1,1,1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })


//Size
const sizes= {
    width: window.innerWidth, 
    height: window.innerHeight
}

//Camera
const aspectRatio = sizes.width/sizes.height;

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
camera.position.set(0,0,3)
// const camera = new THREE.OhjurthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 800)
// camera.lookAt(group.position)

scene.add(camera)

//Axes Helper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

//Rendererr
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


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
//Animate
// const clock = new THREE.Clock()
const tick = () => {
    // group.rotation.x = clock.getElapsedTime()

    //update camera
    camera.position.x = Math.sin(cursor.x * 2*Math.PI) * 3
    camera.position.z = Math.cos(cursor.x * 2*Math.PI) * 3
    camera.position.y = cursor.y * 3
    camera.lookAt(group.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()