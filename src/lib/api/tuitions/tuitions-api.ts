
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const getTuitions = async()=> {
    const res = await fetch(`${BASE_URL}/all-tuitions`);
    return res.json();
};

export const BrowseTuitions = async()=> {
    const res = await fetch(`${BASE_URL}/browse-tuitions`);
    return res.json();
};