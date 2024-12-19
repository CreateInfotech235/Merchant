import { convertImageToBase64 } from "./convertImageToBase64";

const Inputimg = ({ path, status, setStatus, title, height = "150px", width = "150px", type = "img" }) => {

    const updateNestedValue = (path, value) => {
        setStatus((prevStatus) => {
            const newStatus = { ...prevStatus };
            let currentLevel = newStatus;

            for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];
                currentLevel[key] = { ...currentLevel[key] }; // Ensure immutability
                currentLevel = currentLevel[key];
            }

            currentLevel[path[path.length - 1]] = value; // Update the value
            return newStatus;
        });
    };

    const currentValue = path.reduce((obj, key) => obj?.[key], status);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        console.log(file);


        if (file) {
            const base64Image = await convertImageToBase64(file);
            updateNestedValue(path, base64Image); // Update state
        }
    };


    return (
        <div>
            <label
                htmlFor={title.replace(/\s+/g, '')}
                className="block text-sm font-medium text-gray-900 dark:text-white"
            >
                {title}
            </label>
            <input
                type="file"
                id={title.replace(/\s+/g, '')}
                onChange={handleChange}
                className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div
                className={`w-[${width}] h-[${height}] border border-gray-300 bg-gray-200 flex items-center justify-center rounded-lg`}
                style={{
                    backgroundColor: "black",
                    backgroundImage: currentValue
                        ? `url(${currentValue})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                }}
                onClick={() => document.getElementById(title.replace(/\s+/g, '')).click()}
            >
                {!currentValue && (
                    <p className="text-white p-2">{`No ${type} uploaded. Click to upload.`}</p>
                )}
            </div>
        </div>
    );
};

export default Inputimg;
