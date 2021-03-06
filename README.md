# CSCapstone2019 - WebDoctor

This is the project for the CS Senior Project course at Kennesaw State University. It serves as a project for a local physician. The project builds a web portal that can store messages/chat, reports, and requests for appts. A list of project members and contributors can be found below.

## Getting Started

This project assumes you have at least Python 3.6 or later and NodeJS/npm installed on your system.

- [Python](https://www.python.org/downloads/) - I have the latest version (3.7.4)
- [NodeJS](https://nodejs.org/en/) - I'd recommend installing the LTS version for your OS
- [Pipenv](https://pipenv-fork.readthedocs.io/en/latest/) - Virtual environment package recommended for this project
- [Python VSCode Extension](https://code.visualstudio.com/docs/languages/python) - Needed for any Python development in VSCode

Make sure you have pipenv installed globally on your machine.

```
pip install pipenv
```

Then, navigate to the backend directory and install dependencies:

```
cd backend
pipenv install
# then...
pipenv shell
```

**NOTE:** after running `pipenv install`, you must change the Python interpreter to the new virtual environment. To do this, type `CTRL + SHIFT + P` to open the VSCode command palette. Then, type `python` and select the option that says `Python: Select Interpreter` and select the correct interpreter for your pipenv environment.

Once you clone the repo, you will need to install Node.js modules before running any of the front-end (React) scripts:

```
cd frontend/gui
# then...
npm install
```

To start the development server for the back-end (Django), type these commands:

```
cd backend/src
# then...
python manage.py runserver
```

Upon running the Django server, navigate to `http://localhost:8000/api/patient` to view current patient REST API data.

## Making Pull Requests

If you would like to commit a change to the codebase, make sure you submit a pull request first. To do this, make your own branch (not 'master' of course) with this command:

```
git branch your-branch-name-here
```

To switch from master to your new branch:

```
git checkout your-branch-name-here
```

After making your necessary changes, you would just add and commit your changes to the new branch just like you would normally:

```
git add .
git commit -m 'this is a commit message'
git push origin your-branch-name-here
```

## Syncing Dependencies

Navigate to /backend and run

```
pipenv install
```

Then navigate to /frontend/gui and run

```
npm install
```

### `npm start`

Runs the client in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Built With

- [React](https://reactjs.org/) - The front-end web framework used.
- [Django](https://www.djangoproject.com/) - The back-end framework used.
- [Redux](https://react-redux.js.org/) - State management and authentication.
- [Django Rest Framework](https://www.django-rest-framework.org/) - Used for the REST API.
- [Fontawesome](https://fontawesome.com/) - Icons.
- [Reactstrap](https://reactstrap.github.io/) - Bootstrap turned into React components.
- [Axios](https://github.com/axios/axios) - Used for front/back end communication.
- [Redis](https://redis.io/) - An in-memory data structure store, used as backing store for the chat.
- [Ant Design](https://ant.design/docs/react/introduce) - React UI library used for a lot of frontend components.
- [Just Django](https://www.youtube.com/channel/UCRM1gWNTDx0SHIqUJygD-kQ) - [Traversy Media](https://www.youtube.com/user/TechGuyWeb) - Web development learning resources used.

## Authors

- **Josh Arrants** - _Front-end/Back-end & Authentication_ - [joshdrumz](https://github.com/joshdrumz)

- **Augustina Horlava** - _Front-end/Back-end of Chat, Appointment, and Report Upload Implementation. User Dashboard separation and backend models._ - [augichii](https://github.com/Augichii)

See the list of [contributors](https://github.com/CSCapstone2019/WebDoctor/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
