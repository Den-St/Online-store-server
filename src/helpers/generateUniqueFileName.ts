export const generateUniqueFileName = (filename:string) => {
    const [name,ext] = filename.split(".");
    return name + Date.now().toString() + Math.random().toFixed(20) + "." + ext; 
}