// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "myTeam.html");

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

const employeesArry=[]

function managerQestions(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'What is Managers name?',
            validate:validatemanagerName
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the Managers id?',
            validate:validatemanagerId
            },
          {
            type: 'input',
            name: 'managerEmail',
            message: 'What is your managers email?',
            validate:validatemanagerEmail
            },
          {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your managers office number?',
            validate:validatemanagerName
            },
        ])
        .then(response => {
          const manager = new Manager(
            response.managerName,
            response.managerId,
            response.managerEmail,
            response.officeNumber
          );
          const managerCardHtml = managerCard(manager);
          fullTeam.push(managerCardHtml);
          addTeamMembers();
        });
    
      function addTeamMembers() {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'addMembers',
              message: 'What would you like to do?',
              choices: [
                'Add an Engineer',
                'Add an Intern',
                "Done, see my team!",
              ],
            },
          ])
          .then(answers => {
            switch (answers.addMembers) {
              case 'Add an Engineer': {
                promptEngineer();
                break;
              }
              case 'Add an Intern': {
                promptIntern();
                break;
              }
              case "Done, see my team!": {
                buildTeam();
                break;
              }
            }
          });
      }
    
      const promptEngineer = () => {
        console.log('Please enter engineer info');
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'engineerName',
              message: 'Enter engineers name:',
              validate:validateengineerName
              },
            {
              type: 'input',
              name: 'engineerId',
              message: 'Enter engineers id:',
              validate:validateengineerId
              },
            {
              type: 'input',
              name: 'engineerEmail',
              message: 'Enter engineers email:',
              validate:validateengineerEmail
              },
            {
              type: 'input',
              name: 'engineerGithub',
              message: 'Enter GitHub username:',
              validate:validateengineerGithub
              },
          ])
          .then(response => {
            const engineer = new Engineer(
              response.engineerName,
              response.engineerId,
              response.engineerEmail,
              response.engineerGithub
            );
            const engineerCardHtml = engineerCard(engineer);
            fullTeam.push(engineerCardHtml);
            addTeamMembers();
          });
      };
    

      const promptIntern = () => {
        console.log('Please enter intern info');
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'internName',
              message: 'Enter interns name:',
              validate:validateinternName
              },
            {
              type: 'input',
              name: 'internId',
              message: 'Enter interns Id:',
              validate:validateinternId
              },
            {
              type: 'input',
              name: 'internEmail',
              message: 'Enter interns email:',
              validate:validateinternEmail
              },
            {
              type: 'input',
              name: 'internSchool',
              message: 'Enter interns school:',
              validate:validateinternSchool
              },
          ])
          .then(response => {
            const intern = new Intern(
              response.internName,
              response.internId,
              response.internEmail,
              response.internSchool
            );
            const internCardHtml = internCard(intern);
    
            fullTeam.push(internCardHtml);
            addTeamMembers();
          });
      };
    

      function buildTeam() {
        const finalTeam = fullTeam.join('');
        fs.writeFileSync(outputPath, mainHTML(finalTeam), 'utf-8');
      }
    };
    
    mainApp();
    
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
