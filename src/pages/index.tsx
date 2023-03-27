import styles from '@/styles/Home.module.css'
import Header from './components/Header'
import Navbar from './components/Navbar'

const objects = [
  { x: 1000, y: -10000, size: 50, image: '/backdrop/Shape1.png' },
  { x: 1000, y: -10000, size: 75, image: '/backdrop/Shape1.png' },
];

for (let i = 0; i < 30; i++) {
  objects.push({
    x: Math.random() * 2000, y: Math.random() * 1000 + 50, size: Math.random() * 80, image: (i % 2 && "/backdrop/Shape3.png") || (i % 3 && "/backdrop/Shape4.png") || ("/backdrop/Shape2.png")
  })
}
export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      {objects.map((object) => (
        <img
          key={object.image}
          src={object.image}
          style={{
            position: 'absolute',
            top: object.y,
            left: object.x,
            width: object.size,
            height: object.size,
            zIndex: -1
          }}
        />
      ))}
      <Navbar/>
      <Header/>
    </div>
  )
}