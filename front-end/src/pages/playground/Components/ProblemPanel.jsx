import { useState } from 'react';

export default function ProblemPanel() {
    return (
        <>
            <div className="bg-gradient-to-r from-[#ededed] to-[#e6e6e6] p-4 rounded-3xl">
                <h2 className="text-2xl font-bold mb-1">Two Sum</h2>
                <p className='leading-relaxed'>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.</p>
                <h3 className='font-semibold mb-2'>Example 1:</h3>
                <ul className='leading-relaxed'>
                    <li className='ml-2.5 mb-2'><h4 className='inline bg-gray-100 p-1 rounded'>Input:</h4> nums = {"["}2, 7, 11, 15{"]"} , target = 9.</li>
                    <li className='ml-2.5 mb-2'><h4 className='inline bg-gray-100 p-1 rounded'>Output:</h4> {"["}0, 1{"]"}.</li>
                    <li className='ml-2.5'><h4 className='inline bg-gray-100 p-1 rounded'>Explanation:</h4> Because nums{"["}0{"]"} + nums{"["}1{"]"} == 9, we return {"["}1, 0{"]"}.</li>
                </ul>
                <h3 className='font-semibold mb-2'>Example 2:</h3>
                <ul>
                    <li className='ml-2.5 mb-2'><h4 className='inline bg-gray-100 p-1 rounded'>Input:</h4> nums = {"["}3, 2, 4{"]"}, target = 6</li>
                    <li className='ml-2.5 mb-2'><h4 className='inline bg-gray-100 p-1 rounded'>Output:</h4> {"["}1, 2{"]"}</li>
                </ul>
                <h3 className='font-semibold'>Constraints: </h3>
                <ul className='list-disc pl-8 space-y-2'>
                    <li>* 2 {"<="} nums.length {"<="} 104</li>
                    <li>-109 {"<="} nums[i] {"<="} 109</li>
                    <li>-109 {"<="} target {"<="} 109</li>
                    <li>Only one valid answer exists</li>
                </ul>
            </div>
        </>
    );
}