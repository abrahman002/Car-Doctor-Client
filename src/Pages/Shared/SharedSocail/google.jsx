import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const google = () => {
    const {googleSignIn}=useContext(AuthContext)

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            console.log(result)
        })
        .catch(error=>{
            console,log(error)
        })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center mb-2">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default google;