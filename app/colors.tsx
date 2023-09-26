
const dayMode = {
    primary:  `bg-orange-500`,
    mainBG: "bg-white",
   
    navBarBg:`bg-gray-300`,
    navAct: `hover:bg-orange-600 w-full h-12 flex justify-start items-center text-white space-x-1 bg-orange-500`,
    navDeAct: `hover:bg-orange-600 w-full h-12 flex justify-start items-center text-black space-x-1`, 
    
    textColor : 'text-black',

    colorHeading : `text-orange-500`,
    normalText : `text-black`,

    fileUpload : `bg-orange-200 hover:bg-orange-300`,
    
    tabButton: `hover:bg-orange-300  `,
    tabButtonCondition: `bg-orange-400 hover:bg-orange-500`,

    dropDownBg: `bg-gray-100`,

    backgroundBox: `bg-white`,
    inputFeild: `bg-white`,
 
    okButton : `bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white cursor-pointer`,
    noButton : `bg-gray-400 hover:bg-orange-600 active:bg-orange-700 text-white cursor-pointer`,
    
 }

const darkMode = {
    primary:  `bg-orange-500`,
    mainBG: 'bg-black',
   
    navBarBg:`bg-gray-900`,
    navAct: `hover:bg-orange-600 w-full h-12 flex justify-start items-center text-white space-x-1 bg-orange-500`,
    navDeAct: `hover:bg-orange-600 w-full h-12 flex justify-start items-center text-black space-x-1`, 

    textColor : 'text-white',
    
    colorHeading : `text-orange-500`,
    normalText : `text-black`,

    fileUpload : `bg-orange-200 hover:bg-orange-300`,
    
    tabButton: `hover:bg-orange-300  `,
    tabButtonCondition: `bg-orange-400 hover:bg-orange-500`,

    dropDownBg: `bg-gray-600`,

    backgroundBox: `bg-gray-800`,
    inputFeild: `bg-gray-600`,
 
    okButton : `bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white cursor-pointer`,
    noButton : `bg-gray-400 hover:bg-orange-600 active:bg-orange-700 text-white cursor-pointer`,
 }

 var colors = dayMode;

 export function ThemeMode (darkmode : boolean){
    console.log("activated")
    if(darkmode){
        colors = darkMode;
    } else {
        colors = dayMode;
    }
 }
 
 export default colors;