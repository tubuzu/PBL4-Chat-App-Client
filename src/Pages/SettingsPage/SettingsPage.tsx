import React from 'react'
import { Outlet } from 'react-router-dom'
import { SettingsSidebar } from 'src/components/sidebars/settings/SettingsSidebar'

function SettingsPage() {
  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  )
}

export default SettingsPage