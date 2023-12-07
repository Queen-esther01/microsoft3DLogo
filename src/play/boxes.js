import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui'

const gui = new GUI({
    title: 'Tweak Microsoft Logo'
})

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


const cubeTweaks = gui.addFolder('Cubes')
cubeTweaks.close()
const cubeGroupTweaks = gui.addFolder('Cube Group')


const group = new THREE.Group
group.position.y = 0.5
group.position.x = -0.5
scene.add(group)
cubeGroupTweaks.add(group.position, 'x').min(-3).max(3).name('Group Horizontal')
cubeGroupTweaks.add(group.position, 'y').min(-3).max(3).name('Group Vertical')


const debugObject = {
    box1Color: '#F25022',
    box2Color: '#7FBA00',
    box3Color: '#00A3EE',
    box4Color: '#FFB901',
}

const box1material = new THREE.MeshBasicMaterial({ color: debugObject.box1Color })
const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    box1material
)
box1.position.x = -0.04
group.add(box1)
cubeTweaks.addColor(debugObject, 'box1Color').onChange(() => {
    box1material.color.set(debugObject.box1Color)
})
cubeTweaks.add(box1.position, 'x').min(-3).max(3).name('Box 1 Horizontal')
cubeTweaks.add(box1.position, 'y').min(-3).max(3).name('Box 1 Vertical')



const box2material = new THREE.MeshBasicMaterial({ color: debugObject.box2Color })
const box2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    box2material
)
// box2.position.set(1, 0, 0)
box2.position.set(1.04, 0, 0)
group.add(box2)
cubeTweaks.addColor(debugObject, 'box2Color').onChange(() => {
    box2material.color.set(debugObject.box2Color)
})
cubeTweaks.add(box2.position, 'x').min(-3).max(3).name('Box 2 Horizontal')
cubeTweaks.add(box2.position, 'y').min(-3).max(3).name('Box 2 Vertical')


const box3material = new THREE.MeshBasicMaterial({ color: debugObject.box3Color })
const box3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    box3material
)
//box3.position.set(0, -1, 0)
box3.position.set(-0.04, -1.08, 0)
group.add(box3)
cubeTweaks.addColor(debugObject, 'box3Color').onChange(() => {
    box3material.color.set(debugObject.box3Color)
})
cubeTweaks.add(box3.position, 'x').min(-3).max(3).name('Box 3 Horizontal')
cubeTweaks.add(box3.position, 'y').min(-3).max(3).name('Box 3 Vertical')


const box4material = new THREE.MeshBasicMaterial({ color: debugObject.box4Color })
const box4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    box4material
)
// box4.position.set(1, -1, 0)
box4.position.set(1.04, -1.08, 0)
group.add(box4)
cubeTweaks.addColor(debugObject, 'box4Color').onChange(() => {
    box4material.color.set(debugObject.box4Color)
})
cubeTweaks.add(box4.position, 'x').min(-3).max(3).name('Box 4 Horizontal')
cubeTweaks.add(box4.position, 'y').min(-3).max(3).name('Box 4 Vertical')


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