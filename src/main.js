import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {FontLoader, OrbitControls} from "three/addons";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new THREE.Color(0x000000);

const loader = new GLTFLoader();
let hlight = new THREE.AmbientLight (0x404040, 100);

const fontLoader = new FontLoader();


scene.add(hlight);
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );


camera.position.set(0, 3, 4);

let loadedModel;

loader.load( './assets/baguette/scene.gltf', function ( gltf ) {
    loadedModel = gltf;
    gltf.animations; // Array<THREE.AnimationClip>


    // gltf.scene.scale.set(0.5,0.5,0.5); // THREE.Group
    // gltf.scenes; // Array<THREE.Group>
    // gltf.cameras; // Array<THREE.Camera>
    // gltf.asset; // Object

    scene.add( gltf.scene );

}, undefined, function ( error ) {

    console.error( error );

} );

document.addEventListener( 'click', onClick );

const geometry = new THREE.BoxGeometry( 3.5, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(-8,2,-6)
cube.visible = false;
cube.name = 'aboutMeCube';
scene.add( cube );


fontLoader.load( './fonts/coco/Coco Gothic_Regular.json', function ( font ) {

    const helloText = 'Hello! Can you watch my baguette \nwhile I get a coffee and finish building this page?'

    const helloTextGeometry = new TextGeometry( helloText, {
        font: font,
        size: 0.5,
        depth: 0.05,
    } );

    const helloTextMesh = new THREE.Mesh(
        helloTextGeometry,
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );

    helloTextMesh.position.set(-10, 5, -6);
    helloTextMesh.rotation.y = 0.1;
    helloTextMesh.rotation.x = 0.05;

    scene.add(helloTextMesh)

    const aboutMeText = 'About me >';

    const aboutMeTextGeometry = new TextGeometry( aboutMeText, {
        font: font,
        size: 0.5,
        depth: 0.05,
    } );

    const aboutMeTextMesh = new THREE.Mesh(
        aboutMeTextGeometry,
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );

    aboutMeTextMesh.position.set(-10, 2, -6);
    aboutMeTextMesh.rotation.y = 0.1;
    aboutMeTextMesh.rotation.x = 0.05;

    scene.add(aboutMeTextMesh);
} );

camera.lookAt( -1, 1, -4 );
function animate() {

    if (loadedModel) {
        loadedModel.scene.rotation.y += 0.01;
        loadedModel.scene.scale.set(15,15,15);
    }
    renderer.render( scene, camera );

    requestAnimationFrame( animate );
}

if ( WebGL.isWebGLAvailable() ) {

    // Initiate function or other initializations here
    animate();

} else {

    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );

}

const raycaster = new THREE.Raycaster();

function onClick (event) {
    event.preventDefault();

    const pointer = new THREE.Vector2();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        if (intersects[0].object.name === 'aboutMeCube') {
            window.location.href = '/resume'
        }
    }
}