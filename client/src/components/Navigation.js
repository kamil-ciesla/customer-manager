import styles from './navigation.css'

export default function Navigation(props) {
    return (
        <div className="Navigation">
            {props.options}
        </div>
    )
}