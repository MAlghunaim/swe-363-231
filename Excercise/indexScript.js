import * as THREE from './node_modules/three/build/three.module.js'
		
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.BoxGeometry(10, 10, 10)
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

class CosCurve extends THREE.Curve {

	constructor(scale = 1) {
		super()
		this.scale = scale
	}

	getPoint(t, optionalTarget = new THREE.Vector3()) {
		const tx = t
		const ty = 0.15*Math.cos(4*Math.PI * t)
		const tz = 0
		return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
	}
}

const path = new CosCurve(20)
const geometry2 = new THREE.TubeGeometry(path, 65, 1, 8, false)
const material2 = new THREE.MeshBasicMaterial({ color: 0xff7700 })
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.y = 20
mesh2.position.x = 20 
scene.add(mesh2)

const geometry3 = new THREE.TetrahedronGeometry(10, 0)
const material3 = new THREE.MeshBasicMaterial({ color: 0x0aaacc })
const mesh3 = new THREE.Mesh(geometry3, material3)

mesh3.position.x = -20 
mesh3.position.y = 20
scene.add(mesh3)

camera.position.z = 50

function animate() {
	requestAnimationFrame(animate)
	cube.rotation.x += 0.01
	cube.rotation.y += 0.01
	mesh2.rotation.x += 0.01
	mesh2.rotation.y -= 0.01
	mesh3.rotation.x -= 0.01
	mesh3.rotation.y -= 0.01 
	renderer.render(scene, camera)
}
animate()

const screensaverDiv = document.getElementById('screensaver')
screensaverDiv.appendChild(renderer.domElement)


var timer = setTimeout(showScreensaver, 60000)

document.addEventListener('mousemove', hideScreensaver)
document.addEventListener('keydown', hideScreensaver)


function showScreensaver() {
	screensaverDiv.style.display = 'block'
}

function hideScreensaver() {
	screensaverDiv.style.display = 'none'
	clearTimeout(timer)
	timer = setTimeout(showScreensaver, 60000)
}

const yesOrNoElement = document.getElementById('answer')
async function fetchYesOrNo() {
	const response = await fetch('https://yesno.wtf/api')
	const data = await response.json()
	yesOrNoElement.innerHTML = data.answer
}

fetchYesOrNo()


class Post {
	constructor(srcImg, date, title, brief, link) {
		this.srcImg = srcImg
		this.date = date
		this.title = title
		this.brief = brief
		this.link = link
	}
}

const postsArray = new Array(3)

postsArray[0] = new Post("assets/css post.png", (new Date("2023-09-27:00:00.000Z")).toDateString(), "Improving my skill in CSS", `<p>I am studying CSS in order to aid my ability in web development. Soon, I will apply animations in my
webpage. The current page's design is from figma: <a
	href="https://www.figma.com/community/file/1009078914783822877/zeppelins-blog-website-design">https://www.figma.com/community/file/1009078914783822877/zeppelins-blog-website-design</a>
</p>`, "details.html")

postsArray[1] = new Post("assets/js.jpg", (new Date("2023-10-04:00:00.000Z")).toDateString(), "Learning Javascript", `<p>In this week, I am learning javascript. I will use it to build functional websites.</p>`, "details.html")
postsArray[2] = new Post('assets/js.jpg', (new Date('2023-11-21:00:00.000Z')).toDateString(), 'Creating classes in JS', `<p>This post section used to be stored in JSON format, now it's an array of Post objects.</p>`, 'details.html')

/*
const postsData = [
	{
		srcImg: "assets/css post.png",
		date: (new Date("2023-09-27:00:00.000Z")).toDateString(), // YYYY-MM-DDTHH:mm:ss.sssZ is the ISO 8601 format
		title: "Improving my skill in CSS",
		brief: `<p>I am studying CSS in order to aid my ability in web development. Soon, I will apply animations in my
			webpage. The current page's design is from figma: <a
				href="https://www.figma.com/community/file/1009078914783822877/zeppelins-blog-website-design">https://www.figma.com/community/file/1009078914783822877/zeppelins-blog-website-design</a>
		</p>`,
		link: "details.html",
	},
	{
		srcImg: "assets/js.jpg",
		date: (new Date("2023-10-04:00:00.000Z")).toDateString(), // YYYY-MM-DDTHH:mm:ss.sssZ is the ISO 8601 format
		title: "Learning Javascript",
		brief: `<p>In this week, I am learning javascript. I will use it to build functional websites.</p>`,
		link: "details.html",
	},
]
*/
const section = document.getElementById("postSection")
for (const post of postsArray) {
	const postContainer = document.createElement('div')
	postContainer.setAttribute('class', 'post')

	postContainer.innerHTML = `
		   
		<img src="${post.srcImg}" class="postImg" height="360" width="540">
		<p class="date">${post.date}</p>
		<h4>${post.title}</h4>
		${post.brief}
		<a href="${post.link}" class="articleDetails">DETAILS</a>
		`

	section.append(postContainer)
}