import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


const gui = new GUI({
    title: 'Tweak Microsoft Logo'
})
gui.close()

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene();


window.addEventListener('resize', () => {
    //update size
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


//Move canvas to full screen
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }
    else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})


const cubeGroupTweaks = gui.addFolder('Cube Group')


const group = new THREE.Group
group.position.y = 0.8
group.position.x = -1.4
scene.add(group)
cubeGroupTweaks.add(group.position, 'x').min(-3).max(3).name('Group Horizontal')
cubeGroupTweaks.add(group.position, 'y').min(-3).max(3).name('Group Vertical')


const debugObject = {
    box1Color: '#F25022',
    box2Color: '#7FBA00',
    box3Color: '#00A3EE',
    box4Color: '#FFB901',
    textColor: '#fff'
}


const box1material = new THREE.MeshBasicMaterial({ color: debugObject.box1Color })
const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 1),
    box1material
)
box1.position.set(0, -0.1, 0)
group.add(box1)
const cubeTweaks1 = gui.addFolder('Cube 1')
cubeTweaks1.addColor(debugObject, 'box1Color').onChange(() => {
    box1material.color.set(debugObject.box1Color)
})
cubeTweaks1.add(box1.position, 'x').min(-3).max(3).name('Position Horizontal')
cubeTweaks1.add(box1.position, 'y').min(-3).max(3).name('Position Vertical')
cubeTweaks1.add(box1.scale, 'x').min(-3).max(3).name('Stretch Horizontal')
cubeTweaks1.add(box1.scale, 'y').min(-3).max(3).name('Stretch Horizontal')



const box2material = new THREE.MeshBasicMaterial({ color: debugObject.box2Color })
const box2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 1),
    box2material
)
// box2.position.set(1, 0, 0)
box2.position.set(0.8, -0.1, 0)
group.add(box2)
const cubeTweaks2 = gui.addFolder('Cube 2')
cubeTweaks2.addColor(debugObject, 'box2Color').onChange(() => {
    box2material.color.set(debugObject.box2Color)
})
cubeTweaks2.add(box1.position, 'x').min(-3).max(3).name('Position Horizontal')
cubeTweaks2.add(box1.position, 'y').min(-3).max(3).name('Position Vertical')
cubeTweaks2.add(box1.scale, 'x').min(-3).max(3).name('Stretch Horizontal')
cubeTweaks2.add(box1.scale, 'y').min(-3).max(3).name('Stretch Horizontal')



const box3material = new THREE.MeshBasicMaterial({ color: debugObject.box3Color })
const box3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 1),
    box3material
)
//box3.position.set(0, -1, 0)
box3.position.set(0, -0.9, 0)
group.add(box3)
const cubeTweaks3 = gui.addFolder('Cube 3')
cubeTweaks3.addColor(debugObject, 'box3Color').onChange(() => {
    box3material.color.set(debugObject.box3Color)
})
cubeTweaks3.add(box1.position, 'x').min(-3).max(3).name('Position Horizontal')
cubeTweaks3.add(box1.position, 'y').min(-3).max(3).name('Position Vertical')
cubeTweaks3.add(box1.scale, 'x').min(-3).max(3).name('Stretch Horizontal')
cubeTweaks3.add(box1.scale, 'y').min(-3).max(3).name('Stretch Horizontal')



const box4material = new THREE.MeshBasicMaterial({ color: debugObject.box4Color })
const box4 = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 1),
    box4material
)
// box4.position.set(1, -1, 0)
box4.position.set(0.8, -0.9, 0)
group.add(box4)
const cubeTweaks4 = gui.addFolder('Cube 4')
cubeTweaks4.addColor(debugObject, 'box4Color').onChange(() => {
    box4material.color.set(debugObject.box4Color)
})
cubeTweaks4.add(box1.position, 'x').min(-3).max(3).name('Position Horizontal')
cubeTweaks4.add(box1.position, 'y').min(-3).max(3).name('Position Vertical')
cubeTweaks4.add(box1.scale, 'x').min(-3).max(3).name('Stretch Horizontal')
cubeTweaks4.add(box1.scale, 'y').min(-3).max(3).name('Stretch Horizontal')



const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Microsoft',
            {
                font: font,
                size: 0.7,
                height: 0.1,
                curveSegments: 3,
                bevelEnabled: true,
                bevelThickness: 0,
                bevelSize: 0,
                // bevelOffset: 0,
                // bevelSegments: 3
            }
        )
        //textGeometry.center()
        const textMaterial = new THREE.MeshBasicMaterial({ color: debugObject.textColor})
        const textMesh = new THREE.Mesh(
            textGeometry,
            textMaterial
        )
        textMesh.position.x = -0.1
        const text = gui.addFolder('Text')
        text.addColor(debugObject, 'textColor').onChange(() => {
            textMaterial.color.set(debugObject.textColor)
        })
        text.add(textMesh.position, 'x').min(-3).max(3).name('Position Horizontal')
        text.add(textMesh.position, 'y').min(-3).max(3).name('Position Vertical')
        text.add(textMesh.scale, 'x').min(-3).max(3).name('Stretch Horizontal')
        text.add(textMesh.scale, 'y').min(-3).max(3).name('Stretch Horizontal')
        scene.add(textMesh)
    }
)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const tick = () => {
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()