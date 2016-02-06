# eslint-project-relative

what, you want to run ESlint in your $EDITOR, but it keeps picking the wrong
ESLint? Or you don't even have ESLint installed globally?

That sucks. That sucks a lot.

use `eslint-project-relative` instead. It will try to find the "right" eslint
executable for the files you want to lint.

It does this by using node's own resolve algorothm based on the file arguments
you pass to eslint-project-relative. If you don't pass any file args, we'll just
use the present working directory instead.

After we find an eslint, we use `POSIX exec` to run it directly, passing through
all arguments, etc

## usage

first, install globally.

```
npm install -g eslint-project-relative
```

Then, configure editor:

### syntastic (vim)
```
let g:syntastic_javascript_eslint_exec = 'eslint-project-relative'
```

### flycheck (emacs)
```elisp
(setq flycheck-javascript-eslint-executable "eslint-project-relative")
```
