import React, { useEffect, useState, useRef, KeyboardEvent } from "react";

export const hideElements = async () => {
    // const elementMapping: Object = {
    //     shorts: "",
    //     comments: "ytd-item-section-renderer"
    // }
    console.log("Lets go - delete shorts");
    chrome.storage.local.set({ hideShorts: true })

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab.id) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: activeTab.id },
                    func: () => {

                        const waitForElements = () => {
                            const observer = new MutationObserver((mutations, obs) => {
                                const shorts = document.querySelectorAll("ytd-reel-shelf-renderer, ytd-rich-shelf-renderer");
                                if (shorts.length > 0) {
                                    console.log("🚀 ~ Shorts found:", shorts);
                                    shorts.forEach((short:any) => short.style.display = "none");
                                    obs.disconnect(); // Stop observing once shorts are found
                                    console.log("Observer disconnected");
                                }

                                console.log("🚀 ~ waitForShorts ~ shorts:", shorts);
                                shorts.forEach(e => e.remove());
                            });

                            // Observe changes in the body
                            observer.observe(document.body, {
                                childList: true,
                                subtree: true,
                            });
                        }

                        // Start waiting for the element to appear
                        waitForElements();
                    }
                }
            );
        }
    });
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
                    Yes I am a looser and I want to scroll Shorts and Tiktok all day
                </button>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
                    onClick={() => hideElements()}
                >
                    NO - KEEP MY ATTENTION ⚔️
                </button>
            </div>
        </div>
    );
};

export default Menu;
