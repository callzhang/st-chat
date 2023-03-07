import os
import time
import streamlit.components.v1 as components

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "stardust_streamlit_chat",
        url="http://localhost:5173",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("stardust_streamlit_chat", path=build_dir)


def stardust_streamlit_chat(chat=[]):
    component_value = _component_func(chat=chat, default=0)

    return component_value


if not _RELEASE:
    import streamlit as st

    st.subheader("星尘小助手")

    stardust_streamlit_chat([
        {
            "name": "星尘小助手",
            "type": "start",
            "content": "你好，请问有什么问题我可以解答？"
        },
        {
            "name": "User",
            "type": "end",
            "content": "123"
        },
    ])

    time.sleep(1)

    stardust_streamlit_chat([
        {
            "name": "User",
            "type": "end",
            "content": "4<span style='color: red'>5</span>6"
        },
    ])
