// Scene Declartion
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// This defines the initial distance of the camera, you may ignore this as the camera is expected to be dynamic
camera.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 3, 105));
camera.lookAt(0, -4, 1)


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// helper function for later on
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

const colors = {
	red: 0xff0000,
	green: 0x00ff00,
	blue: 0x0000ff,
	yellow: 0xffff00,
	cyan: 0x00ffff,
	magenta: 0xff00ff,
	white: 0xffffff,
	black: 0x000000,
	gray: 0xC0C0C0,
	pink: 0xFFC0CB,
};


// Here we load the cubemap and pitch images, you may change it

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'src/pitch/right.jpg',
  'src/pitch/left.jpg',
  'src/pitch/top.jpg',
  'src/pitch/bottom.jpg',
  'src/pitch/front.jpg',
  'src/pitch/back.jpg',
]);
scene.background = texture;


// TODO: Texture Loading
// We usually do the texture loading before we start everything else, as it might take processing time

const textureLoader = new THREE.TextureLoader();

const ballTexture = textureLoader.load('/src/textures/soccer_ball.jpg');
const redCardTexture = textureLoader.load('/src/textures/red_card.jpg');
const yellowCardTexture = textureLoader.load('/src/textures/yellow_card.jpg');


// TODO: Add Lighting

const DirectionalLight1 = new THREE.DirectionalLight(0xffffff);
makeTranslation(DirectionalLight1, 0, 100, 100);
scene.add(DirectionalLight1);

const DirectionalLight2 = new THREE.DirectionalLight(0xffffff);
makeTranslation(DirectionalLight2, 0, 100, -5);
scene.add(DirectionalLight2);

const AmbientLight = new THREE.AmbientLight(0x404040);
scene.add(AmbientLight);


// TODO: Goal
// You should copy-paste the goal from the previous exercise here

const goalMaterial = new THREE.MeshBasicMaterial({ color: colors.white });
const netMaterial = new THREE.MeshBasicMaterial({ color: colors.gray, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });

// Create the front goalposts
const frontGoalpostRadius = 0.1;
const frontGoalpostHeight = 2;
const frontGoalpostRadialSegments = 32;
const frontGoalpostGeometry = new THREE.CylinderGeometry(frontGoalpostRadius, frontGoalpostRadius, frontGoalpostHeight, frontGoalpostRadialSegments);
const frontGoalpost1 = new THREE.Mesh(frontGoalpostGeometry, goalMaterial);
const frontGoalpost2 = new THREE.Mesh(frontGoalpostGeometry, goalMaterial);

makeTranslation(frontGoalpost1, -3, 1, -5);
makeTranslation(frontGoalpost2,3, 1, -5)

// Create rings/toruses for the goalposts
const goalpostRingGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const goalpostRing1 = new THREE.Mesh(goalpostRingGeometry, goalMaterial);
const goalpostRing2 = new THREE.Mesh(goalpostRingGeometry, goalMaterial);

makeTranslation(goalpostRing1, -3, 0, -5)
makeTranslation(goalpostRing2, 3, 0, -5)

// Create the back supports
const backSupportRadius = 0.1;
const backSupportHeight = 3;
const backSupportRadialSegments = 32;
const backSupportGeometry = new THREE.CylinderGeometry(backSupportRadius, backSupportRadius, backSupportHeight, backSupportRadialSegments);
const backSupport1 = new THREE.Mesh(backSupportGeometry, goalMaterial);
const backSupport2 = new THREE.Mesh(backSupportGeometry, goalMaterial);

makeRotationX(backSupport1, 45)
makeTranslation(backSupport1, -3, 1, -6);
makeRotationX(backSupport2, 45)
makeTranslation(backSupport2, 3, 1, -6);

// Create rings/toruses for the back supports
const backSupportRingGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const backSupportRing1 = new THREE.Mesh(backSupportRingGeometry, goalMaterial);
const backSupportRing2 = new THREE.Mesh(backSupportRingGeometry, goalMaterial);

makeTranslation(backSupportRing1, -3, 0, -7);
makeTranslation(backSupportRing2, 3, 0, -7);

// Create the crossbar
const crossbarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 32);
const crossbar = new THREE.Mesh(crossbarGeometry, goalMaterial);
makeRotationX(crossbar, 90)
makeRotationY(crossbar, 90)
makeTranslation(crossbar, 0, 2, -5);

// Create the side nets
const triangleVertices = [
	new THREE.Vector2(0, 0),
	new THREE.Vector2(2, 0),
	new THREE.Vector2(0, 2)
];
const triangleShape = new THREE.Shape(triangleVertices);
const sideNetGeometry = new THREE.ShapeGeometry(triangleShape);
const rightNet = new THREE.Mesh(sideNetGeometry, netMaterial);
const leftNet = new THREE.Mesh(sideNetGeometry, netMaterial);

makeRotationY(rightNet, 90)
makeTranslation(rightNet, 3, 0, -5);
makeRotationY(leftNet, 90)
makeTranslation(leftNet, -3, 0, -5);

// Create the back net
const backNetGeometry = new THREE.PlaneGeometry(6, 3, 1, 1);
const backNet = new THREE.Mesh(backNetGeometry, netMaterial);
makeRotationX(backNet, 45);
makeTranslation(backNet, 0, 1, -6);


// TODO: Ball
// You should add the ball with the soccer.jpg texture here
const ballGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const ballMaterial = new THREE.MeshPhongMaterial({ map: ballTexture });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
makeTranslation(ball, 0, 0, 100);

//Add all the objects to the scene
const skelton = new THREE.Group();
skelton.add(frontGoalpost1);
skelton.add(frontGoalpost2);
skelton.add(goalpostRing1);
skelton.add(goalpostRing2);
skelton.add(backSupport1);
skelton.add(backSupport2);
skelton.add(backSupportRing1);
skelton.add(backSupportRing2);
skelton.add(crossbar);

const nets = new THREE.Group();
nets.add(rightNet);
nets.add(leftNet);
nets.add(backNet);

const goal = new THREE.Group();
goal.add(skelton);
goal.add(nets);


scene.add(goal);
scene.add(ball);


function makeTranslation(object, x, y, z) {
	const tanslateMatrix = new THREE.Matrix4();
	tanslateMatrix.makeTranslation( x, y, z);
	object.applyMatrix4(tanslateMatrix);
}

function makeRotationX(object, deg) {
	const rotationMatrix = new THREE.Matrix4();
	rotationMatrix.makeRotationX(degrees_to_radians(deg));
	object.applyMatrix4(rotationMatrix);
}

function makeRotationY(object, deg) {
	const rotationMatrix = new THREE.Matrix4();
	rotationMatrix.makeRotationY(degrees_to_radians(deg));
	object.applyMatrix4(rotationMatrix);
}

function makeRotationZ(object, deg) {
	const rotationMatrix = new THREE.Matrix4();
	rotationMatrix.makeRotationZ(degrees_to_radians(deg));
	object.applyMatrix4(rotationMatrix);
}



// TODO: Bezier Curves

// Right winger route
const rightWingerStart = new THREE.Vector3(0, 0, 100);
const rightWingerControl = new THREE.Vector3(50, 0, 50);
const rightWingerEnd = new THREE.Vector3(0, 0, -3);

const rightWingerCurve = new THREE.QuadraticBezierCurve3(rightWingerStart, rightWingerControl, rightWingerEnd);

const rightWingerPoints = rightWingerCurve.getPoints(3000);
const rightWingerGeometry = new THREE.BufferGeometry().setFromPoints(rightWingerPoints);
const rightWingerMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const rightWingerLine = new THREE.Line(rightWingerGeometry, rightWingerMaterial);

// Left winger route
const leftWingerStart = new THREE.Vector3(0, 0, 100);
const leftWingerControl = new THREE.Vector3(-50, 0, 50);
const leftWingerEnd = new THREE.Vector3(0, 0, -3);

const leftWingerCurve = new THREE.QuadraticBezierCurve3(leftWingerStart, leftWingerControl, leftWingerEnd);

const leftWingerPoints = leftWingerCurve.getPoints(3000);
const leftWingerGeometry = new THREE.BufferGeometry().setFromPoints(leftWingerPoints);
const leftWingerMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const leftWingerLine = new THREE.Line(leftWingerGeometry, leftWingerMaterial);


// Center forward route
const centerForwardStart = new THREE.Vector3(0, 0, 100);
const centerForwardControl = new THREE.Vector3(0, 50, 50);
const centerForwardEnd = new THREE.Vector3(0, 0, -3);

const centerForwardCurve = new THREE.QuadraticBezierCurve3(centerForwardStart, centerForwardControl, centerForwardEnd);

const centerForwardPoints = centerForwardCurve.getPoints(3000);
const centerForwardGeometry = new THREE.BufferGeometry().setFromPoints(centerForwardPoints);
const centerForwardMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const centerForwardLine = new THREE.Line(centerForwardGeometry, centerForwardMaterial);

// Add the routes to the scene
scene.add(centerForwardLine);
scene.add(rightWingerLine);
scene.add(leftWingerLine);


const routes = []
routes.push(leftWingerCurve);
routes.push(centerForwardCurve);
routes.push(rightWingerCurve);


// TODO: Camera Settings
// Set the camera following the ball



// TODO: Add collectible cards with textures

class Card {
	constructor(curve, t, object, material) {
		this.curve = curve;
		this.t = t;
		this.object = object;
		this.material = material;
	}
}


// create cards list
const cards = [];

// add the cards to the list
const cardGeometry = new THREE.PlaneGeometry(2,3);
const redCardMaterial = new THREE.MeshPhongMaterial({ map: redCardTexture });
const yellowCardMaterial = new THREE.MeshPhongMaterial({ map: yellowCardTexture });

for (let i = 0; i < 3; i++) {
	let redCardObject = new THREE.Mesh(cardGeometry, redCardMaterial);
	let yellowCardObject = new THREE.Mesh(cardGeometry, yellowCardMaterial);
	let curve = routes[i];
	// make the cards positions somewhere on the current curve
	let t1 = Math.floor(Math.random() * 3000) / 3000;
	let t2 = Math.floor(Math.random() * 3000) / 3000;
	while (t2 == t1) {
		t2 = Math.floor(Math.random() * 3000) / 3000;
	}
	
	let redCard = new Card(curve, t1, redCardObject, redCardMaterial);
	let redCardPosition = curve.getPoint(t1);
	makeTranslation(redCard.object, redCardPosition.x, redCardPosition.y, redCardPosition.z);
	cards.push(redCard);

	let yellowCard = new Card(curve, t2, yellowCardObject, yellowCardMaterial);
	let yellowCardPosition = curve.getPoint(t2);
	makeTranslation(yellowCard.object, yellowCardPosition.x, yellowCardPosition.y, yellowCardPosition.z);
	cards.push(yellowCard);

}
// console.log();

// sort the list by t value (closest card to us should be first)
cards.sort((a, b) => a.t - b.t);

// add the cards to the scene
for (let i = 0; i < 6; i++) {
	scene.add(cards[i].object);
}

let redCardCount = 0;
let yellowCardCount = 0;

function CalculatefairPlayScore(redCardCount, yellowCardCount) {
	const fairPlayScore = 100 * Math.pow(2, -((yellowCardCount + 10 * redCardCount) / 10));
	return fairPlayScore.toFixed(2);
}


// TODO: Add keyboard event
// We wrote some of the function for you

let currentRoute = 1;

const handle_keydown = (e) => {
	if(e.code == 'ArrowLeft'){
		currentRoute = (currentRoute + 2) % 3;

	} else if (e.code == 'ArrowRight'){
		currentRoute = (currentRoute + 1) % 3;
	}
}
document.addEventListener('keydown', handle_keydown);

let pointCounter = 0;
let ballCurrentPoint;

function animate() {

	requestAnimationFrame( animate );

	// TODO: Animation for the ball's position
	// spin the ball around itself
	ball.rotation.x += 0.01;
	ball.rotation.y += 0.01;
	ball.rotation.z += 0.01;

	// move the ball along the curve
	if (pointCounter < 3000) {
		pointCounter += 4.0;
		switch (currentRoute) {
			case 0: {
				ballCurrentPoint = leftWingerCurve.getPoint(pointCounter / 3000);
				break;
			}
			case 1: {
				ballCurrentPoint = centerForwardCurve.getPoint(pointCounter / 3000);
				break;
			}
			case 2: {
				ballCurrentPoint = rightWingerCurve.getPoint(pointCounter / 3000);
				break;
			}
		}

		//make the camera move with the ball
		makeTranslation(camera, ballCurrentPoint.x - ball.position.x, ballCurrentPoint.y - ball.position.y, ballCurrentPoint.z - ball.position.z);
		makeTranslation(ball, ballCurrentPoint.x - ball.position.x, ballCurrentPoint.y - ball.position.y, ballCurrentPoint.z - ball.position.z);

		// TODO: Test for card-ball collision
		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];
			const cardPosition = card.curve.getPoint(card.t);
			const distance = cardPosition.distanceTo(ballCurrentPoint);
			if (distance < 1) {
				card.object.visible = false;
				if (card.material == redCardMaterial) {
					redCardCount += 1;
				}
				else {
					yellowCardCount += 1;
				}
				//remove the card from the list
				cards.splice(i, 1);
			}
		}

		// When the ball gets into the goal, there’s a prompt that notifies the player what is the Fair Play score.
		if (ballCurrentPoint.z < goal.position.z) {
			const fairPlayScore = CalculatefairPlayScore(redCardCount, yellowCardCount);
			alert("Fair Play Score: " + fairPlayScore);
		}

	 }
	renderer.render( scene, camera );

}
animate()