import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// import gsap from 'gsap'
import GUI from 'lil-gui'

const gui = new GUI({
    title: 'Playground'
})

const debugObject = {
    numberOfCircles: 100,
    background: '#D9BFEF',
    cardBackground: '#E6E6FA',
    textColor: '#663399'
}

const canvas = document.querySelector('canvas.kaito')
const scene = new THREE.Scene();
scene.background = new THREE.Color(debugObject.background);
gui.addColor(debugObject, 'background').onChange((value) => {
    scene.background.set(debugObject.background)
})



//RESIZE
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



//FONTS
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/Love_Light_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Happy Birthday \n \u00a0 \u00a0 Kaitonna',
            {
                font: font,
                size: 0.5,
                height: 0.001,
                curveSegments: 3
            }
        )
        textGeometry.center()
        const textMaterial = new THREE.MeshBasicMaterial({ color: 'rebeccapurple' })
        const textMesh = new THREE.Mesh(
            textGeometry,
            textMaterial
        )
        gui.addColor(debugObject, 'textColor').onChange((value) => {
            textMaterial.color.set(debugObject.textColor)
        })
        // textMesh.position.y = 2
        // gsap.to(textMesh.position, {duration: 1, y: 0})
        //gsap.fromTo(textMesh.position, { duration: 2, opacity: 0.5 }, { duration: 2, opacity: 1, ease: 'circ' });
        scene.add(textMesh)
    }
)


// fontLoader.load(
//     '/fonts/Love_Light_Regular.json',
//     (font) => {
//         const textGeometry = new TextGeometry(
//             'Kaitonna',
//             {
//                 font: font,
//                 size: 0.5,
//                 height: 0.001,
//                 curveSegments: 3
//             }
//         )
//         textGeometry.center()
//         const textMaterial = new THREE.MeshBasicMaterial({ color: debugObject.textColor })
//         const textMesh = new THREE.Mesh(
//             textGeometry,
//             textMaterial
//         )
//         gui.addColor(debugObject, 'textColor').onChange((value) => {
//             textMaterial.color.set(debugObject.textColor)
//         })
//         textMesh.position.y = -2
//         gsap.to(textMesh.position, {duration: 1, y: -0.5})
//         scene.add(textMesh)
//     }
// )




//CARD GEOMETRY
const cardGeometry = new THREE.PlaneGeometry(4, 3, 1)
const cardMaterial = new THREE.MeshBasicMaterial({ color: debugObject.cardBackground })
const cardMesh = new THREE.Mesh(
    cardGeometry, cardMaterial
)
cardMaterial.side = THREE.DoubleSide
//gsap.fromTo(cardMesh.rotation, { duration: 3, y: Math.PI }, { duration: 3, y: 0 });
scene.add(cardMesh)




//LIGHTS
const ambientLight = new THREE.AmbientLight('white', 1)
scene.add(ambientLight)


const pointLight = new THREE.PointLight('white', 100)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


//CIRCLE MATERIALS
const colors = ['#1DC4EF', '#D1A602', '#C623E7', '#8D29DF', '#67BF0F']

const circleGeometry = new THREE.SphereGeometry(0.4, 64, 64)
const allCircles = []

for (let i = 0; i < debugObject.numberOfCircles; i++) {
    const circleMaterial = new THREE.MeshPhongMaterial()
    circleMaterial.shininess = 200

    const mesh = new THREE.Mesh(
        circleGeometry,
        circleMaterial
    )
    allCircles.push(mesh)
    
    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = (Math.random() - 0.5) * 10
    mesh.position.z = (Math.random() - 0.5) * 10

    const randomColor = Math.floor(Math.random() * 5)
    circleMaterial.color = new THREE.Color(colors[randomColor])
    
    const scale = Math.random()
    mesh.scale.set(scale, scale, scale)

    scene.add(mesh)
}
// gui.add(debugObject, 'numberOfCircles').onChange((value) => {
//     debugObject.numberOfCircles = value
// })



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
scene.add(camera)


//ORBITCONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 4.0
setTimeout(() => {
    controls.autoRotate = false
}, 15800);
gui.add(controls, 'autoRotate').onChange((value) => {
    console.log(value)
    if(!value){
        controls.autoRotate = false
    }
    else{
        controls.autoRotate = true
    }
})
gui.add(controls, 'autoRotateSpeed')



//DRAGCONTROLS
const dragControls = new DragControls(allCircles, camera, canvas)
dragControls.addEventListener( 'dragstart', function () {

    controls.enabled = false
    console.log('dragging has started')

} );
dragControls.addEventListener( 'dragend', function () {
    controls.enabled = true
    console.log('dragging has ended')
} );

//RENDERER
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