# ANGULAR REACTIVE PROGRAMMING

- Imperative style vs Stateless Observable.
- Async pipe.
- Duplicate HTTP requests (shareReplay).
- View Layer Patters -> Smart vs Presentational components.
- Observe Pattern (BehaviorSubject)
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loading$: Observable<boolean> = loadingSubject.asObservable()
  -> (finalize(callbackFn) OPERATOR)
- Errors -> catchError((err) => //PROCESS AND THEN throwError(err))
- Master Detail UI Pattern
- Single Data Observer Pattern (combineLatest[obs1$, obs2$]) + (startWith OPERATOR in independent observables)
- ChangeDetection.onPush -> (Inputs, Outputs, Observables (async pipe), Manually)
