const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const sid=process.argv[2],run=process.argv[3],code=fs.readFileSync(`Websites/weather/codex/${sid}/js/main.js`,'utf8');
const context={document:{documentElement:{classList:{add(){}}},querySelector(){return null},querySelectorAll(){return []}},URLSearchParams};
vm.createContext(context);vm.runInContext(code,context);
const checks=[];function check(name,expression,expected){const actual=vm.runInContext(expression,context);assert.equal(JSON.stringify(actual),JSON.stringify(expected),name);checks.push({name,result:'pass'});}
if(sid==='WX-04'){
 check('search ignores surrounding whitespace and case',"findPlaces('  LINDEN ').map(p=>p.id)",['linden']);
 check('unknown search yields empty local results',"findPlaces('zzzz')",[]);
 check('blank search yields no results',"findPlaces('  ')",[]);
 check('cold place/day forecast uses numeric offset',"dayTemperatures(2,-3)",[8,9,13,10]);
 check('warning empty-day state',"warningsForDay(1)",[]);
 check('warning selection matches numeric radio value',"warningsForDay('4').map(w=>w.level)",['AMBER']);
}
if(sid==='WX-05'){
 check('Celsius to Fahrenheit freezing',"formatTemp(0,'F')",'32°F');
 check('Celsius to Fahrenheit negative',"formatTemp(-10,'F')",'14°F');
 check('Celsius remains Celsius',"formatTemp(20,'C')",'20°C');
 check('city search normalizes input',"findCities('  MERIDIAN ').map(c=>c.id)",['meridian']);
 check('unknown city produces no matches',"findCities('zzzz')",[]);
 check('empty city query produces no matches',"findCities('   ')",[]);
 check('hourly day offset',"hourlySamples(2)[0].temp",10);
}
if(sid==='WX-06'){
 check('freezing temperature conversion',"formatTemp(0,'F')",'32°F');
 check('mountain search normalizes query',"findMountains('  GREY ').map(m=>m.id)",['grey']);
 check('unknown peak produces no matches',"findMountains('zzzz')",[]);
 check('blank peak query produces no matches',"findMountains('  ')",[]);
 check('base warmer than summit for same period',"forecastValues(600)[0]-forecastValues(1800)[0]",8);
 check('elevation conversion field remains numeric',"forecastValues('1200')[0]",3);
}
const report={site:sid,method:'Executed actual pure data functions in Node VM; document selectors stubbed to no matches. This does NOT execute DOM events, native controls, browser rendering or accessibility.',checks,passed:true};fs.writeFileSync(`${run}/logic-tests.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
