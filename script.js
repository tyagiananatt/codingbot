let currentQuestion = null;
let previousQuestions = new Set();

const questions = {
    easy: {
        arrays: [
            {
                question: `<h3>Two Sum</h3>
                <p>Given an array of integers nums and an integer target, return indices of the two numbers in the array that add up to target.</p>
                <p><strong>Example:</strong><br>
                Input: nums = [2,7,11,15], target = 9<br>
                Output: [0,1]<br>
                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]</p>
                <p><strong>Constraints:</strong><br>
                - 2 ≤ nums.length ≤ 104<br>
                - -109 ≤ nums[i] ≤ 109<br>
                - -109 ≤ target ≤ 109</p>`,
                solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
            },
            {
                question: `<h3>Maximum Subarray</h3>
                <p>Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.</p>
                <p><strong>Example:</strong><br>
                Input: nums = [-2,1,-3,4,-1,2,1,-5,4]<br>
                Output: 6<br>
                Explanation: [4,-1,2,1] has the largest sum = 6</p>
                <p><strong>Constraints:</strong><br>
                - 1 ≤ nums.length ≤ 105<br>
                - -104 ≤ nums[i] ≤ 104</p>`,
                solution: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`
            }
        ],
        strings: [
            {
                question: `<h3>Reverse String</h3>
                <p>Write a function that reverses a string. The input string is given as an array of characters.</p>
                <p><strong>Example:</strong><br>
                Input: ["h","e","l","l","o"]<br>
                Output: ["o","l","l","e","h"]</p>
                <p><strong>Constraints:</strong><br>
                - 1 ≤ s.length ≤ 105<br>
                - s[i] is a printable ascii character</p>`,
                solution: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    return s;
}`
            },
            {
                question: `<h3>Valid Palindrome</h3>
                <p>Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.</p>
                <p><strong>Example:</strong><br>
                Input: s = "A man, a plan, a canal: Panama"<br>
                Output: true<br>
                Explanation: "amanaplanacanalpanama" is a palindrome.</p>
                <p><strong>Constraints:</strong><br>
                - 1 ≤ s.length ≤ 2 * 105<br>
                - The string only contains printable ASCII characters.</p>`,
                solution: `function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    
    return true;
}`
            }
        ],
        recursion: [
            {
                question: `<h3>Fibonacci Number</h3>
                <p>Write a function that returns the nth number in the Fibonacci sequence. The Fibonacci sequence is defined as: F(n) = F(n-1) + F(n-2), where F(0) = 0 and F(1) = 1.</p>
                <p><strong>Example:</strong><br>
                Input: n = 4<br>
                Output: 3<br>
                Explanation: The sequence is [0,1,1,2,3], so F(4) = 3</p>
                <p><strong>Constraints:</strong><br>
                - 0 ≤ n ≤ 30</p>`,
                solution: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}`
            },
            {
                question: `<h3>Power Function</h3>
                <p>Implement pow(x, n), which calculates x raised to the power n (i.e., xn).</p>
                <p><strong>Example:</strong><br>
                Input: x = 2.00000, n = 10<br>
                Output: 1024.00000</p>
                <p><strong>Constraints:</strong><br>
                - -100.0 < x < 100.0<br>
                - -231 ≤ n ≤ 231-1</p>`,
                solution: `function myPow(x, n) {
    if (n === 0) return 1;
    if (n < 0) {
        x = 1/x;
        n = -n;
    }
    if (n % 2 === 0) {
        const half = myPow(x, n/2);
        return half * half;
    }
    return x * myPow(x, n-1);
}`
            }
        ]
    },
    medium: {
        arrays: [
            {
                question: `<h3>3Sum</h3>
                <p>Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.</p>
                <p><strong>Example:</strong><br>
                Input: nums = [-1,0,1,2,-1,-4]<br>
                Output: [[-1,-1,2],[-1,0,1]]</p>
                <p><strong>Constraints:</strong><br>
                - 0 ≤ nums.length ≤ 3000<br>
                - -105 ≤ nums[i] ≤ 105</p>`,
                solution: `function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}`
            }
        ]
    }
};

async function getNextQuestion() {
    const topic = document.getElementById('topic').value;
    
    if (!topic) {
        alert('Please select a topic first!');
        return;
    }
    
    const questionDiv = document.getElementById('question');
    const responseDiv = document.getElementById('response');
    
    questionDiv.innerHTML = '<p class="text-blue-400">Loading question...</p>';
    responseDiv.classList.add('hidden');

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Coding Challenge Bot',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a coding challenge generator. Create clear, detailed programming problems with examples and test cases. Format your response in a clean, consistent structure without mentioning difficulty levels. Use proper HTML formatting with semantic tags.'
                    },
                    {
                        role: 'user',
                        content: `Generate a coding challenge about ${topic} with the following structure:
1. Title (without any difficulty level)
2. Problem description
3. Example input and output with explanations
4. Edge cases to consider
5. Constraints and limitations
6. Time and space complexity requirements

Format the response in this HTML structure:
<div class="challenge">
    <h2 class="title">[Title]</h2>
    <div class="description">[Problem Description]</div>
    <div class="examples">
        <h3>Examples:</h3>
        [Examples with input/output]
    </div>
    <div class="constraints">
        <h3>Constraints:</h3>
        [List of constraints]
    </div>
    <div class="requirements">
        <h3>Requirements:</h3>
        [Time and space complexity requirements]
    </div>
</div>`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            currentQuestion = data.choices[0].message.content;
            
            // Format the response
            const formattedQuestion = currentQuestion
                .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => 
                    `<pre><code class="language-${lang || 'plaintext'}">${code.trim()}</code></pre>`)
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
            
            questionDiv.innerHTML = `
                <div class="fade-in challenge-container bg-gray-800/50 rounded-xl p-6">
                    ${formattedQuestion}
                </div>`;
                
            document.getElementById('answer').value = '';
            responseDiv.classList.add('hidden');
        } else {
            throw new Error('Invalid response format from API');
        }

    } catch (error) {
        console.error('API Error:', error);
        questionDiv.innerHTML = `
            <div class="text-red-400 p-4 rounded-lg bg-gray-800/50">
                <p class="font-bold mb-2">⚠️ Error Fetching Question</p>
                <p>${error.message}</p>
                <button onclick="getNextQuestion()" class="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                    Retry
                </button>
            </div>`;
    }
}

async function checkAnswer() {
    const answer = document.getElementById('answer').value.trim();
    const responseDiv = document.getElementById('response');
    
    if (!currentQuestion || !answer) {
        alert('Please get a question and write an answer first!');
        return;
    }
    
    responseDiv.innerHTML = '<p class="text-blue-400">Analyzing your answer...</p>';
    responseDiv.classList.remove('hidden');

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Coding Challenge Bot',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a coding challenge evaluator. Analyze code solutions and provide detailed feedback on correctness, efficiency, and potential improvements.'
                    },
                    {
                        role: 'user',
                        content: 'Here is the coding challenge:\n\n' + currentQuestion + '\n\nHere is the submitted solution:\n\n' + answer + '\n\nPlease evaluate this solution and provide detailed feedback. Consider:\n1. Correctness\n2. Time and space complexity\n3. Code style and readability\n4. Potential improvements\n5. Edge cases handling'
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const feedback = data.choices[0].message.content;
            
            // Format the response
            const formattedFeedback = feedback
                .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => 
                    `<pre><code class="language-${lang || 'plaintext'}">${code.trim()}</code></pre>`)
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
            
            responseDiv.innerHTML = `
                <div class="fade-in">
                    ${formattedFeedback}
                </div>`;
        } else {
            throw new Error('Invalid response format from API');
        }

    } catch (error) {
        console.error('API Error:', error);
        responseDiv.innerHTML = `
            <div class="text-red-400">
                <p>⚠️ Error analyzing answer: ${error.message}</p>
            </div>`;
    }
}

async function showSolution() {
    const responseDiv = document.getElementById('response');
    
    if (!currentQuestion) {
        alert('Please get a question first!');
        return;
    }
    
    responseDiv.innerHTML = '<p class="text-blue-400">Generating solution...</p>';
    responseDiv.classList.remove('hidden');

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Coding Challenge Bot',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a coding challenge solution provider. Generate clear, efficient, and well-documented solutions to programming problems.'
                    },
                    {
                        role: 'user',
                        content: 'Here is the coding challenge:\n\n' + currentQuestion + '\n\nPlease provide a detailed solution with:\n1. Clear explanation of the approach\n2. Time and space complexity analysis\n3. Well-commented code implementation\n4. Example usage\n5. Alternative approaches if applicable'
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const solution = data.choices[0].message.content;
            
            // Format the response
            const formattedSolution = solution
                .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => 
                    `<pre><code class="language-${lang || 'plaintext'}">${code.trim()}</code></pre>`)
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
            
            responseDiv.innerHTML = `
                <div class="fade-in">
                    ${formattedSolution}
                </div>`;
        } else {
            throw new Error('Invalid response format from API');
        }

    } catch (error) {
        console.error('API Error:', error);
        responseDiv.innerHTML = `
            <div class="text-red-400">
                <p>⚠️ Error generating solution: ${error.message}</p>
            </div>`;
    }
}

// Add event listener for topic selection
document.getElementById('topic').addEventListener('change', function() {
    if (this.value) {
        getNextQuestion();
    }
});
  