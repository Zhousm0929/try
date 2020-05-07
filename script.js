let img1
let img2
let img3
let img4
let img5
let img6
let imgg1
let imgg2
let imgg3
let press
let changguan
let wifiImg
let a = 100
let b = 270
let y = []
let x = []
let e = 420
let f = 120
let speedCar = -0.5
let speed1 = -0.5
let speed2 = -0.3
let speed3 = -0.2
let speed4 = 0.3
let speedx
let speedy
let line1, line2, line3, line4, line5
let clouds
let turn = []
let turn1 = []
let triangles = []
var hit1 = false
var hit2 = false
var hit3 = false
var hit4 = false
var hit5 = false
var hitCircle = false
let CG = false
let rects = [];
let r
const n = 20
let agrid
let yx
let yy
var still = false
let still2 = false
let still3 = false
let still4 = false
let chuizi = false
let jinzhi = false
let wifi = false
let wifion = false
let move = true
let jinzhiON = []
let lineX = 291
let lineY = 260
let lineYY = []
let lineYY2 = []
let mousex, mousey
let img7
let img8
let img9
let img10
let img11
let g = 100
let g2 = 604
let h = 220
let success=0

const colors = [
	"#1B234C", //底色
	"#60413E", //红色
	"#55684E", //绿色
    "#725D1C", //黄色
    "#394070", //紫色
]
const grid = 20 //颜色固定

function preload() {
	//前一张的图片加载
	img1 = loadImage("./imgs/456.png")
	img2 = loadImage("./imgs/123.png")
	img3 = loadImage("./imgs/123.png")
	img5 = loadImage("./imgs/2.png")
	img6 = loadImage("./imgs/zhe.png")
	imgg1 = loadImage("./imgs/gongju1.png")
	imgg2 = loadImage("./imgs/gongju2.png")
	imgg3 = loadImage("./imgs/gongju3.png")
	press = loadImage("./imgs/zheda.png")
	clouds = loadImage("./imgs/1.png")
	changguan = loadImage("./imgs/changguan.png")
	wifiImg = loadImage("./imgs/wifi.png")


	//后一张图片加载
	img7 = loadImage("./imgs/beijing2.png")
	img8 = loadImage("./imgs/21.png")
	img9 = loadImage("./imgs/22.png")
	img10 = loadImage("./imgs/zhe2.png")
	img11 = loadImage("./imgs/23.png")
}

class rectangle {
	//构造人函数
	constructor(x, y, r, i) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.i = i
		this.angle = 1;
		//相当于定义x方向上的speed
		this.yx = cos(TAU / n * i) * (r) / 50;
		//相当于定义y方向上的speed
		this.yy = sin(TAU / n * i) * (r) / 50;
		this.turn = 0
	}
	translating() {
		//检测人撞击边线，每撞击一次turn+1
		if (hit1 || hit2 || hit3 || hit4 || hit5) {
			this.turn += 1
		}
		//turn为单数时，人改变方向
		if (this.turn % 2 != 0) {
			this.yx = -this.yx
			this.yy = -this.yy
			this.x += this.yx
			this.y += this.yy
		}
		//turn为双数时，原方向前进
		 else if (this.turn % 2 == 0) {
			this.x += this.yx
			this.y += this.yy
		}

	}
	//定义方法rotating
	rotating() {
		rotate(this.angle);
		this.angle += 1;
	}
	//定义方法display
	display() {
		fill("#1B234C")
		stroke("#55684E");
		strokeWeight(1);
		ellipse(this.x, this.y, 10, 10);
	}
}

function setup() {
	createCanvas(700, 700)
	//弹出框
	Notiflix.Confirm.Show('前方高能', '提供三个工具，请拖动它们完成建设', '开始', '不了', function() { // Yes button callback
			alert('工具箱🧰：锤子🔨 禁止🚫 代码01010');
		},
		function() { // No button callback 
			alert('怂什么？');
		});
	
	//定义云单初始位置和turn初始为0
	for (var i = 0; i < 8; i++) {
		x[i] = 140 + 5 * (8 - i)
		y[i] = 420 - 8 * i
		turn[i] = 0
	}
    
	agrid = TAU / n
	for (let i = 0; i < n; i++) {
		r = 20
        //定义人的初始位置
		let x = cos(agrid * i) * r + 120
		let y = sin(agrid * i) * r + 180
		rects.push(new rectangle(x, y, r, i));
		rects[i].display()
	}

	for (let i = 0; i < 3; i++) {
		jinzhiON[i] = false
	}

}

function draw() {
	background(255)
	//加speed移动，并超出范围回到原点
	a += speedCar
	b += speedCar
	e += speed2
	f -= speed2
	if (a < -100) {
		a = 480
	}
	if (b < -100) {
		b = 480
	}
	if (e < 200) {
		e = 470
	}
	if (f > 470) {
		f = 120
	}
    //画图
	image(img1, 0, 0, 518, 700)
	image(img2, a, 62, 150, 60)
	image(img3, b, 62, 150, 60)
	image(img5, f, 620, 342, 21)
	image(img5, f - 350, 620, 342, 21)
    //画遮住的图
	image(img6, 0, 0, 518, 700)
	//云移动
	for (var i = 0; i < 8; i++) {
		//move可执行的状态
		if (move) {
			//超出上面，回到原点
			if (y[i] < 270) {
				y[i] = 420
				x[i] = 180
			}
            //超出左右，turn+1
			if (x[i] <= 140 || x[i] >= 200) {
				turn[i]++
			}
			//turn为双数时，x向左移动，y向上
			if (turn[i] % 2 == 0) {
				speedx = -0.08 * (8 - i)
				x[i] += speedx
				speedy = -0.05 * i
				y[i] += speedy
			} 
			//turn为单数时，x向右移动，y向上
			else {
				speedx = 0.08 * (8 - i)
				x[i] += speedx
				speedy = -0.05 * i
				y[i] += speedy
			}
		}
		//画云
		image(clouds, x[i], y[i], 57, 42)
	}

    //画方形遮住
	stroke(255)
	fill(255)
	rect(518, 0, 200, 700)
	//画工具图
	image(imgg1, 535, 200, 72.3, 33.9)
	image(imgg2, 550, 250, 44.1, 52.2)
	image(imgg3, 555, 320, 37.2, 37.2)
	//点击并拖动工具
	if (mouseIsPressed) {
		//dist为两点之间距离
		if (dist(mouseX, mouseY, 550, 210) < 20) wifi = true
		if (dist(mouseX, mouseY, 550, 290) < 20) chuizi = true
		if (dist(mouseX, mouseY, 550, 350) < 30) jinzhi = true
		//拖动锤子图片
		if (chuizi) {
			image(imgg2, mouseX, mouseY, 44.1, 52.2)
			still2 = true
			mousex = mouseX
			mousey = mouseY
		}
        //拖动wifi图片
		if (wifi) {
			image(imgg1, mouseX, mouseY, 72.3, 33.9)
			still3 = true
			mousex = mouseX
			mousey = mouseY
		}
        //拖动禁止图片
		if (jinzhi) {
			image(imgg3, mouseX, mouseY, 37.2, 37.2)
			still4 = true
			mousex = mouseX
			mousey = mouseY
		}

	}
	//锤子工具
	if (!mouseIsPressed && still2) {
		chuizi = false
		if (mousex < 460 && mousex > 310 && mousey < 350 && mousey > 240) {
			//遮住废楼部分
			image(press, 287, 230, 187, 140.8)
			//画线
			for (var i = 0; i < 10; i++) {
				let speeddown = 0.01 * (i + 1)
				lineY += speeddown
				lineX = 320 + i * 5
				lineYY[i] = lineY + 6 * i
				lineYY2[i] = lineY + 6 * (10 - i)
				if (lineYY[i] > 360 || lineYY2[i] > 360) {
					lineYY[i] = 360
					lineYY2[i] = 360
					lineX = 295 + i * 6
					// CG=true
				}
				stroke("#725D1C")
				noFill()
				line(lineX, lineYY[i], lineX + 120, lineYY[i])
				line(lineX, lineYY2[i], lineX + 80, lineYY2[i])
			}
		}
	}
	//每一根直线落下，m+1，m为10时，改变cg状态
	let m = 0
	for (var i = 0; i < 10; i++) {
		if (lineYY[i] == 360 && lineYY2[i] == 360) {
			m++
		}
		if (m == 10){
			CG = true
		}		

	}
	//cg为true时，画遮挡图以及亚运会场馆
	if (CG) {
		image(press, 287, 230, 187, 140.8)
		image(changguan, 320, 250, 150, 90)
	}


	//wifi工具
	if (!mouseIsPressed && still3) {
		wifi = false
		if (mousex < 460 && mousex > 370 && mousey < 500 && mousey > 360) {
			wifion = true
		}
	}
	if (wifion) {
		image(wifiImg, 392, 365, 89.7, 76.2)
	}

	//禁止工具
	if (!mouseIsPressed && still4) {
		jinzhi = false
		if (mousex < 90 && mousex > 40 && mousey < 600 && mousey > 540) {
			jinzhiON[0] = true
		}
		if (mousex < 250 && mousex > 150 && mousey < 460 && mousey > 360) {
			jinzhiON[1] = true
		}
		if (mousex < 500 && mousex > 50 && mousey < 100 && mousey > 70) {
			jinzhiON[2] = true
		}
	}
	if (jinzhiON[0]) {
		image(imgg3, 56, 560, 37.2, 37.2)
	}
	//云不动
	if (jinzhiON[1]) {
		image(imgg3, 190, 440, 37.2, 37.2)
		move = false
	}
	//车停止
	if (jinzhiON[2]) {
		image(imgg3, 260, 80, 37.2, 37.2)
		speedCar = 0
	}

    //画无形的五根线
	stroke("#1B234C")
	line(65, 140, 235, 140)
	line(65, 140, 65, 235)
	line(65, 235, 140, 235)
	line(140, 235, 235, 180)
	line(235, 180, 235, 140)
	noFill()
	stroke("#55684E")
	for (let i = 0; i < n; i++) {
		//人与无形的线的撞击检测
		hit1 = collideLineCircle(65, 140, 235, 140, rects[i].x, rects[i].y, 10);
		hit2 = collideLineCircle(65, 140, 65, 235, rects[i].x, rects[i].y, 10);
		hit3 = collideLineCircle(65, 235, 140, 235, rects[i].x, rects[i].y, 10);
		hit4 = collideLineCircle(140, 235, 235, 180, rects[i].x, rects[i].y, 10);
		hit5 = collideLineCircle(235, 180, 235, 140, rects[i].x, rects[i].y, 10);
		//移动
		rects[i].translating()
		rects[i].display()
	}
    //当任务完成后，执行后一张海报
	if (CG&&wifion&&jinzhiON[0]&&jinzhiON[1]&&jinzhiON[2]) {
		g += speed1
		if (g < -504) {
			g = 504
		}
		g2 += speed1
		if (g2 < -504) {
			g2 = 504
		}
		h += speed4
		if (h < 210 || h > 230) {
			speed4 = -speed4
		}
		image(img7, 0, 0, 518, 700)
		image(img8, g, 75, 504, 33)
		image(img8, g2, 80, 504, 33)
		image(img8, g + 100, 215, 504, 33)
		image(img8, g2 + 100, 215, 504, 33)
		image(img9, g, 585, 504, 55)
		image(img9, g2, 585, 504, 55)
		image(img10, 0, 0, 518, 700)
		image(img11, 100, h, 59.1, 20.7)
		stroke(255)
		fill(255)
		rect(518, 0, 200, 700)
		success++
	}
	
	if(success==1){
		 Notiflix.Report.Success( '建设成功！', '"你真是一个平平无奇建筑🏠小天才" ', '观看活力杭州' ); 
		}
}
