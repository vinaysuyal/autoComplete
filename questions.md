### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

A Component is a class provided by react and is inherited by the a class to become a React Component in a class based component.
e.g.

    class ListComponent extends Component {
		//rest of the code
	}
On the other hand if we extend PureComponent class, our component becomes a pure component, meaning react thinks that it will always return same value for same set of inputs/props. Thus, if out component now encounters same inputs as before, no re-rendering happens.
    
    class ListComponent extends PureComponent {
		//rest of the code
	}
	
### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
A change in the state in context might lead to re-rendering of the component even when shouldComponentUpdate returns false. This might lead to unwanted behaviour. For example, a developer does not want component to re-render but it is re-rendering because of the value coming from context. Hence extra care must be taken while using shouldComponentUpdate with context.

### 3. Describe 3 ways to pass information from a component to its PARENT.
Three ways to pass information from a component to its parent are:
	i) Callback Methods
	ii) Updating state in redux and make parentcomponent subscribe to that change
	iii) Updating state using Context API

### 4. Give 2 ways to prevent components from re-rendering.
Two ways to prevent component re-rendering are:

i) React.memo : Wrap a component inside react memo, so that it always return same output for same set of inputs. For non primitive props, we can even include a comparator to compare values of the props rather than performing a shallow comparison. For class based components, the equivalent would be to use PureComponent/shouldComponentUpdate.
 
ii) useCallback : we can wrap function in useCallback so that we are referring to same old function in the memory, and the component that it is passed to does not consider it as a different prop than the previous one.
	
### 5. What is a fragment and why do we need it? Give an example where it might break my app.
Whenever we return JSX from a component, we need to make sure that it has a single root. Often it is not a good choice to add unnecessary HTML elements like div to ensure a single root element. In order to avoid using unnecessary HTML elements, React provides us with Fragments, we can wrap a list multiple nodes inside <React.Fragment> and when tree gets rendered on DOM, these extra tags are not present.

 Fragments might sometimes break the styling of the components when using external libraries.
 
### 6. Give 3 examples of the HOC pattern.
Three examples of HOC pattern in React are:

i) React.memo

ii) React.Lazy

iii) React.forwardRef

### 7. What's the difference in handling exceptions in promises, callbacks and async...await?
When using callback we have to pass a callback function which need to be executed after completion of async task.
	eg : 
	
	function callbackFunc(flag) {
	  if (flag) console.log("success");
	  else console.log("failed");
	}

	function runAsync(num, callbackFunc) {
	  try {
		if (num === 0) throw new Error("Number equal to 0");
		else callbackFunc(true);
	  } catch (error) {
		callbackFunc(false);
	  }
	}

	runAsync(10, callbackFunc);
	runAsync(0, callbackFunc);

When using promises, we use promise chaining in order to handle errors.
	e.g. 
	
	new Promise((resolve, reject) => reject("reject")).catch(err => console.log(err))
			new Promise((resolve, reject) => resolve("resolve")).then(res =>console.log(res).catch(err => console.log(err)))
		
When using async await, we can simply use try catch block as we use for synchronous operations.
	e.g. 
	
	async function asyncFunction() {
		  try {
			const result = await anotherAsyncFunction();
			// Handle success
		  } catch (error) {
			// Handle error
		  }
		}
		
### 8. How many arguments does setState take and why is it async.
Async takes one argument. Either the new value or a function with previous state as the parameter if we want to update state based on previous value.

setState is async to make sure that we are able to batch up the changes in state that occured during execution of current function. This is important because if setState is synchronous and let us suppose there are five state updates in our current function. Then the DOM will be rendered five time and program execution will halt until the re-rendering has finished. This could make our website unresponsive for the time that rendering is taking place.

### 9. List the steps needed to migrate a Class to Function Component.
Following are the steps in order to migrate from class to functional component.

i) Replace setState and this.state with useState hook

ii) Replace different lifecycle methods with useEffect to mimic behaviour of lifecycle methods.

iii) Move the return JSX of render method in class to return of current component.

iv) remove constructor and accept props as parameter to functional component.

iv) If class Component is a PureComponent, use React.memo to wrap the functional component.

v) Test the code for all cases.
	
### 10. Styles can be used in following ways:

i) using a different CSS file and importing it in current file.

ii) using inline styling like <div style={{width: "200px", backgroundColor:"black"}}> </div>

iii) using an object to create styles and then passing it to inline styles.

### 11. How to render an HTML string coming from the server.
We can use dangerouslySetInnerHTML in order to populate an html String as in the example below.
	 
	  const htmlString = '<p>Hello, <strong>World!</strong></p>';

	  return (
		<div dangerouslySetInnerHTML={{ __html: htmlString }} />
	  );
