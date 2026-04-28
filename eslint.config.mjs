import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        ignores: [
            'node_modules/**',
            'out/**',
            'release/**',
            'dist/**',
            '.specify/**',
            'specs/**'
        ]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/renderer/**/*.{ts,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off'
        },
        settings: {
            react: { version: 'detect' }
        }
    },
    {
        files: ['src/renderer/src/components/presentational/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '@renderer/lib/*',
                                '@renderer/hooks/*',
                                '@trpc/*',
                                'electron',
                                'electron-trpc/*',
                                'node:*'
                            ],
                            message:
                                'Presentational components must not import logic, IPC, hooks, or node/electron modules. Move data-fetching to a hook in @renderer/hooks/ and wire it via a container.'
                        }
                    ]
                }
            ],
            'no-restricted-syntax': [
                'error',
                {
                    selector: "CallExpression[callee.name=/^use(State|Effect|Reducer|Context|Memo|Callback|LayoutEffect|SyncExternalStore|TransitionState)$/]",
                    message:
                        'Presentational components must be stateless. Lift state into a hook + container.'
                }
            ]
        }
    }
];
