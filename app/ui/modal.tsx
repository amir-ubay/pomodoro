export function Modal({ display }: { display: boolean }) {
  let displayClases = display ? "block" : "hidden";
  return (
    <div id="modal-container" className={`${displayClases} fixed inset-0 z-50`}>
      <div id="modal-overlay" className="fixed inset-0 bg-black bg-opacity-50">
        <div
          id="modal-wrapper"
          className="flex items-center justify-center h-full"
        >
          <div
            id="modal-content"
            className="w-2/3 h-auto bg-white m-auto rounded-lg"
          >
            <div id="modal-header">
              <div className="w-full py-4 px-3 border-b-2 border-gray-200">
                <p className="w-full text-center font-bold text-xl">SETTING</p>
              </div>
            </div>
            <div id="modal-body">
              <div className="py-4 px-3 text-center text-gray-600">
                <p className="px-6 text-left text-gray-800 font-bold mb-4">
                  Timer Config (minute)
                </p>
                <div id="timer-config" className="flex justify-around">
                  <div className="basis-1/3">
                    <p>Pomodoro</p>
                    <input
                      type="number"
                      className="mt-2 max-w-24 h-10 bg-gray-200 rounded-md px-1"
                    ></input>
                  </div>
                  <div className="basis-1/3">
                    <p>Short Break</p>
                    <input
                      type="number"
                      className="mt-2 max-w-24 h-10 bg-gray-200 rounded-md px-1"
                    ></input>
                  </div>
                  <div className="basis-1/3">
                    <p>Long Break</p>
                    <input
                      type="number"
                      className="mt-2 max-w-24 h-10 bg-gray-200 rounded-md px-1"
                    ></input>
                  </div>
                </div>
                <div id="auto-start-breaks" className="mt-4">
                  <div className="flex px-6">
                    <div className="basis-4/5 text-left">
                      <p className="text-gray-800 font-bold">
                        Auto Start Breaks
                      </p>
                    </div>
                    <div className="basis-1/5">
                      <input
                        type="checkbox"
                        id="hs-basic-usage"
                        className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600

before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                      ></input>
                    </div>
                  </div>
                </div>
                <div id="auto-start-pomodoro" className="mt-4">
                  <div className="flex px-6">
                    <div className="basis-4/5 text-left">
                      <p className="text-gray-800 font-bold">
                        Auto Start Pomodoro
                      </p>
                    </div>
                    <div className="basis-1/5">
                      <input
                        type="checkbox"
                        id="hs-basic-usage"
                        className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600

before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                      ></input>
                    </div>
                  </div>
                </div>
                <div id="long-brake-config" className="mt-4">
                  <div className="flex px-6">
                    <div className="basis-4/5 text-left">
                      <p className="text-gray-800 font-bold">
                        Long Brake Interval
                      </p>
                    </div>
                    <div className="basis-1/5">
                      <input
                        type="number"
                        className="mt-2 max-w-24 h-10 bg-gray-200 rounded-md px-1"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="modal-footer">
              <div className="">
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-100">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
