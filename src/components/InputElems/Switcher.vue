<template>
    <div class="switch_wrapper">
        <div class="switch_title">
            <span>{{ switcherTitle }}</span>
        </div>
        <label class="switch">
            <input type="checkbox" @click="toggleCheckbox">
            <div class="slider round"></div>
        </label>
    </div>
</template>

<script>
export default {
    name: "Switcher",
    props: {
        switcherTitle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            checkbox: false
        }
    },
    methods: {
        toggleCheckbox() {
            this.checkbox = !this.checkbox
            this.$emit('setCheckboxVal', this.checkbox)
        }
    }
}
</script>

<style lang="scss" scoped>

.switch_wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: max-content;

    .switch_title {
        span {
            color: v-bind('displayColorGetter("neutral900")');
            font-size: 14px;
            font-weight: 500;
            line-height: 18px;
            text-transform: capitalize;
            transition: color .3s ease-in-out;
        }
    }

    .switch {
        display: inline-block;
        height: 34px;
        position: relative;
        width: 60px;

        input {
            display: none;

            &:checked {
                + {
                    .slider {
                        background-color: #101010;
                        &:before {
                            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZTpyZ2IoMCUsMCUsMCUpO3N0cm9rZS1vcGFjaXR5OjE7c3Ryb2tlLW1pdGVybGltaXQ6NDsiIGQ9Ik0gMy4zMjIyNjYgMTEuNjgzNTk0IEMgMy4zMjIyNjYgMTYuNjUyMzQ0IDcuMzQ3NjU2IDIwLjY4MzU5NCAxMi4zMjIyNjYgMjAuNjgzNTk0IEMgMTYuMTA3NDIyIDIwLjY4MzU5NCAxOS4zNDc2NTYgMTguMzQ1NzAzIDIwLjY3NzczNCAxNS4wMjkyOTcgQyAxOS42NDA2MjUgMTUuNDUxMTcyIDE4LjUwMzkwNiAxNS42ODU1NDcgMTcuMzIwMzEyIDE1LjY4NTU0NyBDIDEyLjM1MTU2MiAxNS42ODU1NDcgOC4zMjAzMTIgMTEuNjU0Mjk3IDguMzIwMzEyIDYuNjg1NTQ3IEMgOC4zMjAzMTIgNS41MDE5NTMgOC41NDg4MjggNC4zNjUyMzQgOC45NjQ4NDQgMy4zMjgxMjUgQyA1LjY1NDI5NyA0LjY1ODIwMyAzLjMyMjI2NiA3Ljg5ODQzNyAzLjMyMjI2NiAxMS42ODM1OTQgWiBNIDMuMzIyMjY2IDExLjY4MzU5NCAiIHRyYW5zZm9ybT0ibWF0cml4KDAuNjY2NjY3LDAsMCwwLjY2NjY2NywwLDApIi8+CjwvZz4KPC9zdmc+Cg==);
                            transform: translateX(26px);
                            -ms-transform: translateX(26px);
                            -webkit-transform: translateX(26px);
                        }
                    }
                }
            }

            &:focus {
                + {
                    .slider {
                        box-shadow: 0 0 1px #101010;
                    }
                }
            }
        }

        .slider {
            background-color: #cccccc;
            bottom: 0;
            cursor: pointer;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            transition: 0.4s;
            -webkit-transition: 0.4s;

            &:before {
                background-color: #ffffff;
                background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlOnJnYigxMC45ODAzOTIlLDE1LjI5NDExOCUsMjkuODAzOTIyJSk7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtbWl0ZXJsaW1pdDo0OyIgZD0iTSA3LjI4MzIwMyAxMC4zMzU5MzcgQyA3LjEwMTU2MiAxMC44NTc0MjIgNy4wMDE5NTMgMTEuNDE0MDYyIDcuMDAxOTUzIDEyIEMgNy4wMDE5NTMgMTQuNzU5NzY2IDkuMjQwMjM0IDE2Ljk5ODA0NyAxMiAxNi45OTgwNDcgQyAxNC43NTk3NjYgMTYuOTk4MDQ3IDE2Ljk5ODA0NyAxNC43NTk3NjYgMTYuOTk4MDQ3IDEyIEMgMTYuOTk4MDQ3IDkuMjQwMjM0IDE0Ljc1OTc2NiA3LjAwMTk1MyAxMiA3LjAwMTk1MyBDIDExLjQxNDA2MiA3LjAwMTk1MyAxMC44NTc0MjIgNy4xMDE1NjIgMTAuMzM1OTM3IDcuMjgzMjAzICIgdHJhbnNmb3JtPSJtYXRyaXgoMC42NjY2NjcsMCwwLDAuNjY2NjY3LDAsMCkiLz4KPHBhdGggc3R5bGU9ImZpbGw6bm9uZTtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2U6cmdiKDEwLjk4MDM5MiUsMTUuMjk0MTE4JSwyOS44MDM5MjIlKTtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjQ7IiBkPSJNIDEyIDEuOTk4MDQ3IEwgMTIgNC4wMDE5NTMgIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjY2NjY2NywwLDAsMC42NjY2NjcsMCwwKSIvPgo8cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZTpyZ2IoMTAuOTgwMzkyJSwxNS4yOTQxMTglLDI5LjgwMzkyMiUpO3N0cm9rZS1vcGFjaXR5OjE7c3Ryb2tlLW1pdGVybGltaXQ6NDsiIGQ9Ik0gMTIgMTkuOTk4MDQ3IEwgMTIgMjIuMDAxOTUzICIgdHJhbnNmb3JtPSJtYXRyaXgoMC42NjY2NjcsMCwwLDAuNjY2NjY3LDAsMCkiLz4KPHBhdGggc3R5bGU9ImZpbGw6bm9uZTtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2U6cmdiKDEwLjk4MDM5MiUsMTUuMjk0MTE4JSwyOS44MDM5MjIlKTtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjQ7IiBkPSJNIDQuMDAxOTUzIDEyIEwgMS45OTgwNDcgMTIgIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjY2NjY2NywwLDAsMC42NjY2NjcsMCwwKSIvPgo8cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZTpyZ2IoMTAuOTgwMzkyJSwxNS4yOTQxMTglLDI5LjgwMzkyMiUpO3N0cm9rZS1vcGFjaXR5OjE7c3Ryb2tlLW1pdGVybGltaXQ6NDsiIGQ9Ik0gMjIuMDAxOTUzIDEyIEwgMTkuOTk4MDQ3IDEyICIgdHJhbnNmb3JtPSJtYXRyaXgoMC42NjY2NjcsMCwwLDAuNjY2NjY3LDAsMCkiLz4KPHBhdGggc3R5bGU9ImZpbGw6bm9uZTtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2U6cmdiKDEwLjk4MDM5MiUsMTUuMjk0MTE4JSwyOS44MDM5MjIlKTtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjQ7IiBkPSJNIDE5Ljc3NTM5MSA0LjIyNDYwOSBMIDE3LjU1NDY4NyA2LjI1MTk1MyAiIHRyYW5zZm9ybT0ibWF0cml4KDAuNjY2NjY3LDAsMCwwLjY2NjY2NywwLDApIi8+CjxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlOnJnYigxMC45ODAzOTIlLDE1LjI5NDExOCUsMjkuODAzOTIyJSk7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtbWl0ZXJsaW1pdDo0OyIgZD0iTSA0LjIyNDYwOSA0LjIyNDYwOSBMIDYuNDQ1MzEyIDYuMjUxOTUzICIgdHJhbnNmb3JtPSJtYXRyaXgoMC42NjY2NjcsMCwwLDAuNjY2NjY3LDAsMCkiLz4KPHBhdGggc3R5bGU9ImZpbGw6bm9uZTtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2U6cmdiKDEwLjk4MDM5MiUsMTUuMjk0MTE4JSwyOS44MDM5MjIlKTtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1taXRlcmxpbWl0OjQ7IiBkPSJNIDYuNDQ1MzEyIDE3LjU1NDY4NyBMIDQuMjI0NjA5IDE5Ljc3NTM5MSAiIHRyYW5zZm9ybT0ibWF0cml4KDAuNjY2NjY3LDAsMCwwLjY2NjY2NywwLDApIi8+CjxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlOnJnYigxMC45ODAzOTIlLDE1LjI5NDExOCUsMjkuODAzOTIyJSk7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtbWl0ZXJsaW1pdDo0OyIgZD0iTSAxOS43NzUzOTEgMTkuNzc1MzkxIEwgMTcuNTU0Njg3IDE3LjU1NDY4NyAiIHRyYW5zZm9ybT0ibWF0cml4KDAuNjY2NjY3LDAsMCwwLjY2NjY2NywwLDApIi8+CjwvZz4KPC9zdmc+Cg==);
                background-position: center;
                background-repeat: no-repeat;
                bottom: 4px;
                content: "";
                height: 26px;
                left: 4px;
                position: absolute;
                transition: 0.4s;
                width: 26px;
                -webkit-transition: 0.4s;
            }

            &.round {
                border-radius: 34px;

                &:before {
                    border-radius: 50%;
                }
            }
        }
    }
}

</style>