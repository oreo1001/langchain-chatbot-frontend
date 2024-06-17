import Lottie from 'react-lottie-player'
import loadingJson_2 from '../../../public/assets/loading.json'

const Loading = () => {
    return (
        // <div className="relative w-1/2 h-full"></div>
        <div className="h-screen flex flex-col items-center justify-center">
            <Lottie
                loop
                animationData={loadingJson_2}
                play
                style={{ width: 300, height: 300 }}
            ></Lottie>
        </div>
    )
}

export default Loading