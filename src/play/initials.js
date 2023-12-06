import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const group = new THREE.Group()
group.position.y = 0.5
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'mistyrose' })
)
cube1.position.x = 0.5
cube1.position.y = 1
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'lavender' })
)
cube2.position.x = 0
cube2.position.y = 1
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'aliceblue' })
)
cube3.position.x = -0.5
cube3.position.y = 1
group.add(cube3)

const cube4 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'mistyrose' })
)
cube4.position.x = -0.5
cube4.position.y = 0.5
group.add(cube4)

const cube5 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'lavender' })
)
cube5.position.x = -0.5
cube5.position.y = 0
group.add(cube5)

const cube6 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'aliceblue' })
)
cube6.position.x = 0
cube6.position.y = 0
group.add(cube6)

const cube7 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'mistyrose' })
)
cube7.position.x = 0.5
cube7.position.y = 0
group.add(cube7)

const cube8 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'mistyrose' })
)
cube8.position.x = -0.5
cube8.position.y = -0.5
group.add(cube8)

const cube9 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'aliceblue' })
)
cube9.position.x = -0.5
cube9.position.y = -1
group.add(cube9)

const cube10 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'lavender' })
)
cube10.position.x = 0
cube10.position.y = -1
group.add(cube10)

const cube11 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'mistyrose' })
)
cube11.position.x = 0.5
cube11.position.y = -1
group.add(cube11)


const stepGroup = new THREE.Group()
stepGroup.position.y = 0.85
scene.add(stepGroup)

const step1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'mintcream' })
)
step1.position.x = 0
step1.position.y = -1.7
step1.scale.set(5, 0.5, 0.6)
stepGroup.add(step1)

const step2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'lavender' })
)
step2.position.x = 0
step2.position.y = -1.9
step2.scale.set(7, 0.5, 0.8)
stepGroup.add(step2)

const step3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 1),
    new THREE.MeshBasicMaterial({ color: 'mistyrose' })
)
step3.position.x = 0
step3.position.y = -2.1
step3.scale.set(9, 0.5, 1)
stepGroup.add(step3)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 'lightpink' })
// )
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 'peach' })
// )
// cube2.position.x = -1.5
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 'lightgreen' })
// )
// cube3.position.x = 1.5
// group.add(cube3)


const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // group.rotation.y = elapsedTime
    controls.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()