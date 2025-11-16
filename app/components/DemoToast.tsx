import { toast } from "sonner";

const DemoToast = () => {
    return (
        <button
        onClick={() => toast.success("This is a success toast message!")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
            Show Toast
        </button>
    )
}

export default DemoToast;