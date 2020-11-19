import { useEffect } from 'react';

// How to use?
//
// add below "machine" variable definition of useMachine hook
// xStateDebugger({ machine, name: 'COPY-PASTE-COMPONENT-NAME' })

export function useXstateDebugger({ name, machine }: { name: string; machine: any }) {
  const [_, __, service] = machine || [];
  useEffect(() => {
    const subscription = service.subscribe((state) => {
      console.log(`##### ${name} #########################################################################`);
      console.log(JSON.stringify(state.event, null, 2));
      console.log({
        ...state.context,
        rootRef: undefined, // remove circular reference before JSON.stringify
      });

      console.log({
        transitions: `${state.transitions?.[0]?.source?.id} >>> ${
          state.transitions?.[0]?.target?.map((xr) => xr?.id).join(',') || state.transitions?.[0]?.source?.id
        }`,
        nextStates: JSON.stringify(state.value),
      });
    });

    return subscription.unsubscribe;
  }, []);
}
