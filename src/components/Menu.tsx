import React, { useEffect, useState, useRef, KeyboardEvent } from "react";

const waitForShorts = () => {
    return new Promise<NodeList | null>((resolve) => {
        const interval = setInterval(() => {
            const shorts = document.querySelectorAll('div');
            console.log("🚀 ~ waitForShorts ~ shorts:", shorts)
            if (shorts) {
                clearInterval(interval);
                resolve(shorts as NodeList);
            }
        }, 100);
    });
};

const hideShorts = async () => {
    console.log("Lets go - delete shorts");
    const shorts = await waitForShorts();
    console.log("🚀 ~ hideShorts ~ shorts:", shorts)
    
    chrome.runtime.sendMessage({ type: 'DELETE_SHORTS' });
};

const looser = () => {
    console.log("looser");
}

const Menu: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
                This website is trying to grab your attention
                Do you want to let it do it? 🤔
            </h1>
            <div className='flex flex-col gap-4'>
                <button 
                    className="bg-transparent text-white border border-white py-3 px-6 rounded-full text-xl font-medium opacity-20 hover:opacity-100 hover:bg-white hover:text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={() => looser()}
                >
                    Yes I am a looser and I want to scroll Shorts and Tiktok during long hours
                </button>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
                    onClick={() => hideShorts()}
                >
                    NO - KEEP MY ATTENTION ⚔️
                </button>
            </div>
        </div>
    );
};

export default Menu;
