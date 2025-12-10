import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form className="flex flex-col items-center justify-center
bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6
max-w-xs mx-auto">
      <div className="flex flex-col items-start">
        <label className="text-gray-500" htmlFor="email">Email:</label>
        <input id="email" className="border-b-1 text-gray-600" name="email" type="email" required autoFocus
               autoComplete="email"/>
      </div>
      <div className="flex flex-col items-start">
        <label className="text-gray-500" htmlFor="password">Password:</label>
        <input id="password" className="border-b-1 text-gray-600" name="password" type="password"
               autoComplete="password" required/>
      </div>
      <div className="flex justify-around w-full">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                formAction={login}>Log in</button>
        <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                formAction={signup}>Sign up</button>
      </div>
    </form>
  )
}