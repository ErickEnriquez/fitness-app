import type { NextPage, GetStaticProps } from 'next'
import styles from '../styles/Home.module.css'
import { getWorkoutTemplate } from '@server/getWorkoutTemplate'
import { Workout } from '@prisma/client'

interface props {
    workout: Workout[]
}
const IndexPage: NextPage = (props: props) => {
    const workoutOptions = props.workouts.map((item, idx) => {
        return (
            <option value={item.type} key={idx}>{item.type}</option>
        )
    })
    return (
        <div className={styles.container}>
            <h1>This is the workout for today</h1>
            {/* <h3>Legs Heavy</h3>
            <ul className='my-4'>
                <li>
                    <strong>Squat</strong>
                    <h5 className='mb-4'>5 Sets 5, 5, 5, 5, 5 </h5>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 '>
                        <input type="number" className='outline mx-2 mb-4 lg:mb-0' />
                        <input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
                        <input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
                        <input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
                        <input type="number" className='outline  mx-2 mx-2 mb-4 lg:mb-0' />
                    </div>

                </li>
            </ul> */}
            <select name="" id="">

            </select>
            <button className='px-5 rounded-full bg-blue-700 mx-1 text-white hover:bg-white hover:text-blue-700 hover:outline'>Save</button>
            <button className='px-5 rounded-full bg-green-700 mx-1 text-white  hover:bg-white hover:text-green-700 hover:outline'>Submit</button>
        </div >
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const workouts = await getWorkoutTemplate()
    return { props: { workouts } }
}

export default IndexPage
