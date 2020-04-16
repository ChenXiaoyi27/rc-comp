import React from 'react';

export default class LazyLoadDemo extends React.Component {
    constructor(props) {
        super();
        this.host = "http://47.101.53.139:3001/images/";
        this.loadingSrc = this.host + 'imgLoading.png';
        this.state = {
            images: [
                { id: '01', realSrc: this.host + '01.jpg' },
                { id: '02', realSrc: this.host + '02.jpg' },
                { id: '03', realSrc: this.host + '03.jpg' },
                { id: '04', realSrc: this.host + '04.jpg' },
                { id: '05', realSrc: this.host + '05.jpg' },
                { id: '06', realSrc: this.host + '06.jpg' },
                { id: '07', realSrc: this.host + '07.jpg' },
                { id: '08', realSrc: this.host + '08.jpg' },
                { id: '09', realSrc: this.host + '09.jpg' },
                { id: '10', realSrc: this.host + '10.jpg' }
            ]
        };
        this.timer = null;
    }
    componentWillMount() {
        let { images } = this.state;
        images.map((img) => {
            img.src = this.loadingSrc;
        });
        this.setState({ images });
    }
    componentDidMount() {
        window.onload = () => {
            this.start();
        }
    }
    onScroll() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => this.start(), 200);
    }
    start() {//渲染图片
        console.log('start')
        let { images } = this.state;
        images.map((img) => {
            if (this.isShow(img.id) && img.src === this.loadingSrc) {
                img.src = img.realSrc;
            }
        });
        this.setState({ images });
    }
    isShow(id) {//是否在可视区
        let img = document.getElementById(`img${id}`), container = document.getElementById('container'),
            upperLimit = img.offsetTop <= container.offsetHeight + container.scrollTop,
            lowerLimit = img.offsetTop + img.offsetHeight >= container.scrollTop;
        return upperLimit && lowerLimit;
    }
    render() {
        let { images } = this.state;
        return <div style={{ padding: '10px' }}>
            <div id="container" onScroll={() => this.onScroll()} style={{ height: '350px', overflowY: 'auto', border: '1px solid #eee' }}>
                <ul className="txt-c">
                    {images.map((img) => {
                        return <li key={img.id} className="mt10"><img id={`img${img.id}`} src={img.src} alt={img.id} width="400px" /></li>
                    })}
                </ul>
            </div>
        </div>
    }
}
export { LazyLoadDemo };