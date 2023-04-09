import React, { useState, useEffect } from 'react'

import Sidebar from '../Components/Sidebar'

import { auth, db } from '../firebase'

import {
    getFirestore,
    setDoc,
    doc,
    addDoc,
    collection,
    where,
    orderBy,
    onSnapshot,
    query,
    getDocs
} from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';

import '../Styles/Dashboard.css'
import TotalTimePanel from '../Components/TotalTimePanel'
import WorkoutChooser from '../Components/WorkoutChooser'
import WorkoutSet from '../Components/WorkoutSet'

export default function Dashboard() {

    const [name, setName] = useState("Anurag")
    const [lastWorkouts, setLastWorkouts] = useState(['workout1', 'workout2', 'workout3', 'workout4'])

    const [allWorkouts, setAllWorkouts] = useState([])
    const [currUser, loading] = useAuthState(auth)
    const [user, setUser] = useState('')

    useEffect(() => {
        const allWorkoutsArr = []

        const getDefaultWorkouts = async () => {
            try {
                const q = query(
                    collection(db, "DEFAULT_WORKOUTS"),
                    orderBy("lastUsed")
                )
                const unsub = onSnapshot(q, querySnapshot => {
                    querySnapshot.forEach(workout => {
                        let data = workout.data();
                        allWorkoutsArr.push(data)
                    })

                    setAllWorkouts(allWorkoutsArr)
                    console.log(allWorkouts)
                })

                return () => unsub

            } catch (e) {
                console.error(e)
                alert("Error: could not read from database")
            }

        }

        const getUserWorkouts = async () => {
            await getDefaultWorkouts();
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                // return userDoc.docs[0].id;
                setUser(userDoc.docs[0].id)

                if (user !== '' || user !== undefined) {
                    const q = query(collection(db, 'users', user, 'workouts'), orderBy("day"))
                    const unsub = onSnapshot(q, (querySnapshot) => {
                        querySnapshot.forEach(workout => {
                            let data = workout.data();
                            allWorkoutsArr.push(data);
                        })

                        setAllWorkouts(allWorkoutsArr)
                    })

                    return () => unsub
                }

            } catch (err) {
                return;
            }
        }

        getUserWorkouts()

    }, [currUser])

    return (
        <div className="dashboard-holder">
            <Sidebar />

            <div className="right-side-holder">
                <div className='name-label'><h2>Hello, {name}!</h2></div>
                <div className='top-half-holder'>
                    <TotalTimePanel />
                    <WorkoutChooser />
                </div>
                <div className="bottom-half-holder">
                    {allWorkouts.map(workout => {
                        return <WorkoutSet name={workout.name} workout={workout.exercises} />
                    })}
                </div>
            </div>
        </div >
    )
}